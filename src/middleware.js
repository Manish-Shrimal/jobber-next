import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    // Exclude /admin/login and /admin/forgetpassword from redirection
    if (
      !pathname.startsWith("/admin/login") &&
      !pathname.startsWith("/admin/forgetpassword")
    ) {
      let token = request.cookies.get("token");
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }

    // Redirect to dashboard if already logged in and trying to access login page
    if (pathname.startsWith("/admin/login")) {
      let token = request.cookies.get("token");
      if (token) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  }

  if (pathname.startsWith("/employer")) {
    // Exclude /admin/login and /admin/forgetpassword from redirection
    if (
      !pathname.startsWith("/employer/login") &&
      !pathname.startsWith("/employer/forgetpassword") &&
      !pathname.startsWith("/employer/resetpassword")
    ) {
      let token = request.cookies.get("tokenEmployer");
      if (!token) {
        return NextResponse.redirect(new URL("/employer/login", request.url));
      }
    }

    // Redirect to dashboard if already logged in and trying to access login page
    if (pathname.startsWith("/employer/login")) {
      let token = request.cookies.get("tokenEmployer");
      if (token) {
        return NextResponse.redirect(
          new URL("/employer/dashboard", request.url)
        );
      }
    }
  }

 

}
