from django.contrib import admin
from .models import (
    Product, Order, OrderItem, Cart, CartItem, UserInfo,
    Category, SubCategory, JewelryCustomization
)

class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'phone_number', 'shipping_address', 'is_admin')
    search_fields = ('user__username', 'phone_number', 'user__first_name', 'user__last_name')

    def get_readonly_fields(self, request, obj=None):
        if not request.user.is_superuser:
            return ['is_admin']
        return []

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')
    search_fields = ('name',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_price', 'status', 'created_at')
    search_fields = ('user__username', 'status')
    list_filter = ('status', 'payment_method', 'created_at')
    readonly_fields = ('created_at',)
    inlines = [OrderItemInline]
    fieldsets = (
        ('Order Details', {
            'fields': ('user', 'total_price', 'status', 'payment_method', 'coupon_applied', 'created_at')
        }),
        ('Shipping Information', {
            'fields': ('name', 'phone_number', 'billing_address', 'shipping_address')
        }),
    )

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1

class CartAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)
    inlines = [CartItemInline]

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'description')
    list_filter = ('category',)
    search_fields = ('name', 'category__name')

class JewelryCustomizationAdmin(admin.ModelAdmin):
    list_display = ('jewelry_type', 'material', 'price', 'user', 'status', 'created_at')
    list_filter = ('jewelry_type', 'material', 'status', 'created_at')
    search_fields = ('jewelry_type', 'material', 'user__username', 'engraving_text')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Jewelry Information', {
            'fields': ('jewelry_type', 'material', 'size', 'engraving_text', 'price', 'status')
        }),
        ('User Information', {
            'fields': ('user', 'created_at')
        }),
    )

admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(JewelryCustomization, JewelryCustomizationAdmin)
