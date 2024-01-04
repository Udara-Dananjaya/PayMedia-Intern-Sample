<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        try {
            return response()->json(User::all(), 500);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8|max:12|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                'img' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $user = new User(); // Create a new User instance

            // Set user attributes
            $user->name = Str::ucfirst($request->input('name'));
            $user->email = $request->input('email');

            // Hash the password
            $user->password =  Hash::make($request->input('password'));

            if ($request->hasFile('img')) {
                $image = $request->file('img');
                $imageName = 'user_' . $user->id . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $user->img = 'images/' . $imageName;
            }

            $user->save();

            return response()->json($user, 201);
        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {

        try {
            $request->validate([
                'name' => 'string|max:255',
                'email' => 'email|unique:users,email,' . $id,
                'password' => 'nullable|string|min:8|max:12|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                'img' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $user = User::findOrFail($id);// Find the user by ID

            // Update user attributes
            $user->name = $request->filled('name') ? Str::ucfirst($request->input('name')) : $user->name;
            $user->email = $request->filled('email') ? $request->input('email') : $user->email;

            if ($request->has('password')) {
                // Update the password only if provided
                $user->password =  Hash::make($request->input('password'));
            }

            // Update the image if provided
            if ($request->hasFile('img')) {
                $image = $request->file('img');
                $imageName = 'user_' . $user->id . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $user->img = 'images/' . $imageName;
            }

            $user->save();// Save the user

            return response()->json($user, 200);
        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            return response()->json(User::find($id), 500);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return 204;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
