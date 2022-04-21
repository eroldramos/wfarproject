from rest_framework.permissions import SAFE_METHODS, BasePermission

class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(
             request.user and request.user.is_authenticated
        )
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(
             request.user and request.user.is_authenticated and request.user.is_staff
        )
