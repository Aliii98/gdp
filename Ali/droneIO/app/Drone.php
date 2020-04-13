<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drone extends Model
{
    protected $fillable = [
        'airframe', 'deployed_by', 'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'deployed_by', 'id');
    }
}
