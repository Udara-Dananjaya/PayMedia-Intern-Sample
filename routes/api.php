<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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
 });

Route::middleware(['auth:api'])->group(function () {
    Route::post('checkToken', [AuthController::class, 'checkToken']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('list', [UserController::class, 'index']);

    Route::post('create', [UserController::class, 'create']);
    Route::post('update/{id}', [UserController::class, 'update']);

    Route::post('list/{id}', [UserController::class, 'show']);
    Route::post('delete/{id}', [UserController::class, 'delete']);

});
