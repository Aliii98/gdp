<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->increments('mission_id');
            $table->timestamps();
            $table->integer('drone_id')->unsigned();;
            $table->float('start_lat');
            $table->float('start_lng');
            $table->float('end_lat');
            $table->float('end_lng');
            $table->time('completion_time');
            $table->foreign('drone_id')->references('id')->on('drones');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('missions');
    }
}
