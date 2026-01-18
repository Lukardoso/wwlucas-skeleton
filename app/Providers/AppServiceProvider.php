<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureModels();
        $this->configureCommands();
    }

    private function configureModels(): void
    {
        Model::shouldBeStrict();
    }

    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(
            $this->app->environment() === 'production'
        );
    }
}
