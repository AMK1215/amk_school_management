<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('contact', [
            'message' => 'To access detailed lesson content, please register or contact our school administration.',
        ]);
    }
}
