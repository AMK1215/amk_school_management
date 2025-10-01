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
            $table->string('user_name')->unique()->nullable()->after('name');
            $table->string('phone')->unique()->nullable()->after('email');
            $table->unsignedBigInteger('teacher_id')->nullable()->after('phone');
            $table->boolean('status')->default(true)->after('teacher_id');
            $table->boolean('is_changed_password')->default(false)->after('status');
            $table->integer('type')->default(30)->after('is_changed_password'); // Default to Student
            $table->string('referral_code')->unique()->nullable()->after('type');
            
            // Add foreign key constraint
            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['teacher_id']);
            $table->dropColumn([
                'user_name',
                'phone',
                'teacher_id',
                'status',
                'is_changed_password',
                'type',
                'referral_code',
            ]);
        });
    }
};
