<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    protected $guarded = [];

    protected $casts = [
        'affiliations' => 'json',
        'marqueeShow' => 'boolean',
        'showAdmissionsInMarquee' => 'boolean',
    ];
}