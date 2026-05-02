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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('siteName');
            $table->string('shortName');
            $table->string('tagline');
            $table->string('established');
            $table->string('phone');
            $table->string('mobile');
            $table->string('email');
            $table->text('address');
            $table->text('mapUrl');
            $table->string('facebookUrl')->nullable();
            $table->string('youtubeUrl')->nullable();
            $table->string('linkedinUrl')->nullable();
            $table->string('whatsappNumber');
            $table->json('affiliations')->nullable();
            $table->boolean('marqueeShow')->default(true);
            $table->text('marqueeText');
            $table->boolean('showAdmissionsInMarquee')->default(true);
            $table->string('workingHours')->nullable();
            $table->string('copyrightInfo')->nullable();
            $table->string('ctaTitle')->nullable();
            $table->string('ctaSubtitle')->nullable();
            $table->timestamps();
        });

        Schema::create('heroes', function (Blueprint $table) {
            $table->id();
            $table->string('badge');
            $table->string('title');
            $table->string('titleHighlight')->nullable();
            $table->string('titleEnd')->nullable();
            $table->text('subtitle');
            $table->string('ctaPrimary');
            $table->string('ctaSecondary');
            $table->text('backgroundImage');
            $table->json('stats')->nullable();
            $table->timestamps();
        });

        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('titleHighlight')->nullable();
            $table->string('directorName');
            $table->string('directorTitle');
            $table->text('directorImage');
            $table->text('directorMessage');
            $table->string('principalName');
            $table->string('principalTitle');
            $table->text('principalImage');
            $table->text('principalMessage');
            $table->json('achievements')->nullable();
            $table->text('description');
            $table->text('mission');
            $table->text('vision');
            $table->timestamps();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('board');
            $table->string('duration');
            $table->text('description');
            $table->string('icon');
            $table->boolean('featured')->default(false);
            $table->boolean('admissionsOpen')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('role');
            $table->text('image');
            $table->text('bio');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title')->nullable();
            $table->text('image');
            $table->string('category');
            $table->timestamps();
        });

        Schema::create('testimonials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('course');
            $table->text('message');
            $table->integer('rating')->default(5);
            $table->timestamps();
        });

        Schema::create('page_heroes', function (Blueprint $table) {
            $table->string('pageKey')->primary();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('badge')->nullable();
            $table->timestamps();
        });

        Schema::create('admissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('course');
            $table->text('message')->nullable();
            $table->timestamps();
        });

        Schema::create('layouts', function (Blueprint $table) {
            $table->id();
            $table->json('navbar');
            $table->json('footer');
            $table->timestamps();
        });

        Schema::create('homepages', function (Blueprint $table) {
            $table->id();
            $table->json('sections');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('heroes');
        Schema::dropIfExists('abouts');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('gallery_items');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('page_heroes');
        Schema::dropIfExists('admissions');
        Schema::dropIfExists('layouts');
        Schema::dropIfExists('homepages');
    }
};
