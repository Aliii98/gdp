<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i < 50; $i++){
            $username = Str::random(10);
            // $this->call(UsersTableSeeder::class);
            DB::table('users')->insert([
                'name' => $username,
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
            ]);
            DB::table('drones')->insert([
                'airframe' => Str::random(10),
                'deployed_by' => $username,
            ]);
        }
    }
}
