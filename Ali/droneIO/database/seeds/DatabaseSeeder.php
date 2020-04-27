<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $role1 = Role::create(['name' => 'Super-Admin']);
        $role2 = Role::create(['name' => 'Public-User']);
        $role = Role::create(['name' => 'Admin']);

        $permission = Permission::create(['name' => 'map view']);
        $role->givePermissionTo($permission);
        $permission = Permission::create(['name' => 'map view sample']);
        $role2->givePermissionTo($permission);
        $permission = Permission::create(['name' => 'manual control']);
        $role->givePermissionTo($permission);
        $permission = Permission::create(['name' => 'mission planning']);
        $role->givePermissionTo($permission);
        $permission = Permission::create(['name' => 'live feed']);
        $role->givePermissionTo($permission);
        $permission = Permission::create(['name' => 'thermal feed']);
        $role->givePermissionTo($permission);
        $permission = Permission::create(['name' => 'heatmap']);
        $role->givePermissionTo($permission);
        $permission = Permission::create(['name' => 'get status']);
        $role->givePermissionTo($permission);
    }
}