# Generated by Django 5.0.1 on 2024-02-05 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eCommerceApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pay',
            name='image',
            field=models.ImageField(default='pay/2024/02/pay_default.jpg', upload_to='pay/%Y/%m'),
        ),
        migrations.AlterField(
            model_name='shop',
            name='logo',
            field=models.ImageField(default='shop_logo/2024/02/shoplogo3.jpg', upload_to='shop_logo/%Y/%m'),
        ),
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='user/2024/02/avatardefault.jpg', upload_to='user/%Y/%m'),
        ),
    ]
