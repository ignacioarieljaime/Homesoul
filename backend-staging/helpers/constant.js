"use strict";

const adminRoutes = [
    "/admin/add",
    "/admin/update",
    "/admin/user/add",
    "/admin/user/list",
    "/admin/user/update/:userId",
    "/admin/user/status/update/:userId",
    "/admin/user/detail/:userId",
    "/admin/user/delete/:userId",
    "/admin/promotion/list",
    "/admin/promotion/delete/:id",
    "/admin/background/add",
    "/admin/background/status/update/:id",
    "/admin/background/delete/:id",
    "/admin/background/detail/:id",
    "/admin/header/add",
    "/admin/header/status/update/:id",
    "/admin/header/delete/:id",
    "/admin/header/detail/:id",
    "/admin/header/update/:id",
    "/admin/contact/list",
    "/admin/contact/delete/:id",
]

const userRoutes = [
    "/contact",
    "/logo/add",
    "/logo/list",
    "/logo/list/all",
    "/logo/delete/:id",
    "/promotion/setting/list",
    "/promotion/create",
    "/promotion/list",
    "/promotion/detail/:id",
    "/promotion/update",
    "/promotion/delete/:id",
    "/signup",
    "/login",
    "/forgot-password",
    "/profile",
    "/profile/update",
    "/password/update",
    "/delete",   
]


module.exports = {
    adminRoutes,
    userRoutes,
}