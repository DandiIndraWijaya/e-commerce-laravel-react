<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
 
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
 
    <title>React Laravel</title>

    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Grandstander&display=swap" rel="stylesheet"> 

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/header.css') }}" rel="stylesheet">
    <style>
        *{
            font-family: 'Grandstander', cursive;
        }

        .btn:focus {
            outline: none;
            box-shadow: none;
        }
    </style>
</head>
<body>
    <div id="index"></div>
    
    <script src="https://www.paypalobjects.com/api/checkout.js"></script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>