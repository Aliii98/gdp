<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waypoint extends Model
{
    protected $fillable = [
        'lat', 'lng', 'mission_id'
    ];

    public function drone()
    {
        return $this->belongsTo(Mission::class, 'mission_id', 'mission_id');
    }
}
