<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    protected $fillable = [
        'drone_id', 'start_lat', 'start_lng', 'end_lat', 'end_lng', 'completion_time'
    ];

    public function drone()
    {
        return $this->belongsTo(Drone::class, 'drone_id', 'id');
    }
}
