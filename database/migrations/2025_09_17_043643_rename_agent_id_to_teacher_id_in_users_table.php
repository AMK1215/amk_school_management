<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Simply rename the column if it exists
            if (Schema::hasColumn('users', 'agent_id')) {
                $table->renameColumn('agent_id', 'teacher_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'teacher_id')) {
                $table->renameColumn('teacher_id', 'agent_id');
            }
        });
    }
};