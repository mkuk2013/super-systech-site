<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Homepage extends Model
{
    protected $guarded = [];

    protected $casts = [
        'sections' => 'json',
    ];
}