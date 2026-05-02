<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageHero extends Model
{
    protected $primaryKey = 'pageKey';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];
}