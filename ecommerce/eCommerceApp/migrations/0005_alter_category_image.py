# Generated by Django 5.0.1 on 2024-02-10 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eCommerceApp', '0004_category_image_alter_shop_logo_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='image',
            field=models.ImageField(default='category/2024/02/category.png', upload_to='category/%Y/%m'),
        ),
    ]