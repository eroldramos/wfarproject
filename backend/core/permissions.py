from rest_framework.permissions import SAFE_METHODS, BasePermission

class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(
             request.user and request.user.is_authenticated
        )


class IsAuthenticatedAndNotAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and request.user.is_staff == 0
        )

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(
             request.user and request.user.is_authenticated and request.user.is_staff
        )

class IsAdminAreaChairAndDeptHead(BasePermission):
    def has_permission(self, request, view):
        return bool(
            ( request.user and request.user.is_authenticated and request.user.is_staff) or 
            (request.user and request.user.is_authenticated and request.user.user_type == 2) or
            (request.user and request.user.is_authenticated and request.user.user_type == 3)

        )
