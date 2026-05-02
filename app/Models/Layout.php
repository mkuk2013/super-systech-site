<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    protected $guarded = [];

    protected $casts = [
        'navbar' => 'json',
        'footer' => 'json',
    ];
}