<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
//use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([],function (){
    Route::post('login',[AuthController::class, 'login']);
    Route::post('checkToken',[AuthController::class, 'checkToken']);
    Route::post('logout',[AuthController::class, 'checklogoutToken']);
   //  Route::post('admin',[AdminController::class, 'index']);
 
 });