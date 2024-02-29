from rest_framework import viewsets, generics, permissions, decorators, status, parsers
from rest_framework.decorators import action
from rest_framework.response import Response

from . import serializer, paginator
from .models import Category, Product, User, Shop, CartDetail, Order, Pay, OrderDetail
from .perms import StaffPermissions, ShopConfirmPermissions, UserPermissions, ProductOwnerPermissions, OwnerPermissions, \
    AdminPermissions
from .utils import confirm_status_update, user_update, sum_price


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = serializer.CategorySerializer

    def create(self, request, *args, **kwargs):
        try:
            p = Category.objects.create(name=request.data.get('name'), image=request.data.get('image'))
            p.save()
            return Response(serializer.CategorySerializer(p, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [AdminPermissions()]
        return [permissions.AllowAny()]


class ProductViewSet(viewsets.ViewSet, generics.ListAPIView, generics.DestroyAPIView, generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = serializer.ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        elif self.action in ['destroy']:
            return [ProductOwnerPermissions()]
        return [permissions.IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        kw = request.query_params.get('kw', None)
        cate_id = request.query_params.get('cate_id', None)
        if kw:
            products = Product.objects.filter(name__icontains=kw)
        elif cate_id:
            products = Product.objects.filter(category=cate_id)
        else:
            products = Product.objects.all()
        page = self.paginate_queryset(products)
        if page is not None:
            serialize = serializer.ProductSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serialize.data)
        return Response(serializer.ProductSerializer(products, context={'request': request}, many=True).data)

    @action(methods=['post'], detail=True, url_path='add-cart', url_name='add-cart')
    def add_cart(self, request, pk):
        user = request.user
        product = Product.objects.get(pk=pk)
        cart = user.carts.filter(product_id=pk).first()
        if cart:
            cart.quantity += 1
            cart.total_price = int(cart.quantity * cart.product.price)
            cart.save()
        else:
            new_cart = CartDetail(quantity=1, total_price=product.price, user=request.user,
                                  product=product)
            new_cart.save()

        list_product = user.carts.all()
        return Response(serializer.CartDetailSerializer(list_product, many=True, context={'request': request}).data,
                        status=status.HTTP_201_CREATED)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = serializer.UserSerializer
    parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action in ['current_user', 'create_shop']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_name='current-user', url_path='current-user')
    def current_user(self, request):
        return Response(serializer.UserSerializer(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, url_name='create-shop', url_path='create-shop')
    def create_shop(self, request):
        try:
            shop = Shop.objects.create(name=request.data.get('name'), address=request.data.get('address'),
                                       logo=request.data.get('logo'),
                                       user_id=request.user.id)
            shop.save()
            return Response(serializer.ShopSerializer(shop, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        except Shop.DoesNotExist:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)


class ShopViewSet(viewsets.ViewSet, generics.ListAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    queryset = Shop.objects.all()
    serializer_class = serializer.ShopSerializer

    def get_permissions(self):
        if self.action in ['confirm']:
            return [StaffPermissions()]
        elif self.action in ['add_product']:
            return [ShopConfirmPermissions()]
        elif self.action in ['current_shop', 'get_products']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['put'], url_path='confirm', detail=True)
    def confirm(self, request, pk):
        try:
            shop = Shop.objects.get(pk=pk)
            user_update(shop.user)
            shop_update = confirm_status_update(shop)
            return Response(serializer.ShopSerializer(shop_update, context={'request': request}).data)
        except Shop.DoesNotExist:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['post'], detail=True, url_path='add-product', url_name='add-product')
    def add_product(self, request, pk):
        try:
            p = Product.objects.create(name=request.data.get('name'), price=request.data.get('price'),
                                       description=request.data.get('description'), image=request.data.get('image'),
                                       category_id=request.data.get('category_id'), shop_id=self.get_object().id)
            p.save()
            return Response(serializer.ProductSerializer(p, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['get'], detail=False, url_name="current-shop", url_path='current-shop')
    def current_shop(self, request):
        try:
            current_user = request.user
            query = Shop.objects.filter(user_id=current_user.id).first()
            return Response(serializer.ShopSerializer(query, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        except Shop.DoesNotExist:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['get'], detail=True, url_path="products", url_name='products')
    def get_products(self, request, pk):
        try:
            shop = Shop.objects.get(pk=pk)
            query = shop.products.all()
            return Response(serializer.ProductSerializer(query, many=True, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        except Shop.DoesNotExist:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CartViewSet(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = serializer.CartDetailSerializer
    queryset = CartDetail.objects.all()

    def get_permissions(self):
        if self.action in ['remove_product']:
            return [OwnerPermissions()]

        return [permissions.IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        current_user = request.user
        queryset = current_user.carts.all()
        return Response(serializer.CartDetailSerializer(queryset, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['delete'], detail=True, url_name='remove-product', url_path='remove-product')
    def remove_product(self, request, pk):
        try:
            pd = CartDetail.objects.get(pk=pk)
            pd.delete()
            query = request.user.carts.all()
            return Response(serializer.CartDetailSerializer(query, many=True, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        except CartDetail.DoesNotExist:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['post'], detail=False)
    def checkout(self, request):
        try:
            list_product = request.user.carts.all()
            if list_product.exists():
                total_price = sum_price(list_product)
                pay = Pay.objects.get(pk=request.data.get('pay_id'))
                order = Order(address=request.data.get('address'), total_price=total_price, user=request.user, pay=pay)
                order.save()
                for item in list_product:
                    order_item = OrderDetail(quantity=item.quantity, total_price=item.total_price, order=order,
                                             product=item.product)
                    order_item.save()
                    item.delete()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Pay.DoesNotExist:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PayViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    serializer_class = serializer.PaySerializer
    queryset = Pay.objects.all()


class OrderViewSet(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = serializer.OrderSerializer
    queryset = Order.objects.all()

    def get_permissions(self):
        if self.action in ['order_detail']:
            return [UserPermissions()]
        return [permissions.IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        try:
            current_user = request.user
            queryset = current_user.orders.all()
            return Response(serializer.OrderSerializer(queryset, many=True, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['get'], detail=True, url_path='order-detail', url_name='order-detail')
    def order_detail(self, request, pk):
        try:
            list_details = OrderDetail.objects.filter(order_id=pk)
            return Response(
                serializer.OrderDetailSerializer(list_details, many=True, context={'request': request}).data,
                status=status.HTTP_200_OK)
        except OrderDetail.DoesNotExist:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
