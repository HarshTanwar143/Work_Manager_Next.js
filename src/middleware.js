import { NextResponse } from 'next/server'


export function middleware(request) {
    // console.log('this is middleware');

    const userAccessing = request.nextUrl.pathname;
    const method = request.method;

    let token = request.cookies.get('authToken')?.value;

    if(userAccessing === '/login' || userAccessing === '/signup'){
      if(token){
        return NextResponse.redirect(new URL('/profile/user', request.url));
      }
    }


    if(userAccessing === '/add-task' || userAccessing.startsWith('/profile')){
      if(!token){
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }else if(userAccessing === '/show-tasks'){
      if(!token){
        return NextResponse.redirect(new URL('/signup', request.url));
      }
    }

    if(userAccessing === '/api/current'){
      return NextResponse.next();
    }


    if(!token && userAccessing.startsWith('/api') && userAccessing !== '/api/login' &&  !(userAccessing === '/api/users' && method === 'POST')){
      // console.log('inside api middleware');
      // console.log('userAccessing', userAccessing);
      // console.log('method', method);
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // console.log('userAccessing out : ', userAccessing);
    // console.log('method out : ', method);

    return NextResponse.next();
}


export const config = {
  matcher: [
    '/signup',
    '/login',
    '/api/:path*',
    '/add-task',
    '/show-tasks',
    '/profile/:path*',
  ]
}