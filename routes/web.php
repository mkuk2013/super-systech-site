<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [SiteController::class, 'index'])->name('home');
Route::get('/about', [SiteController::class, 'about'])->name('about');
Route::get('/courses', [SiteController::class, 'courses'])->name('courses');
Route::get('/gallery', [SiteController::class, 'gallery'])->name('gallery');
Route::get('/team', [SiteController::class, 'team'])->name('team');
Route::get('/admissions', [SiteController::class, 'admissions'])->name('admissions');
Route::post('/admissions', [SiteController::class, 'storeAdmission']);
Route::get('/contact', [SiteController::class, 'contact'])->name('contact');
Route::get('/privacy-policy', [SiteController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/terms-of-service', [SiteController::class, 'termsOfService'])->name('terms-of-service');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/hero', [App\Http\Controllers\Admin\AdminController::class, 'manageHero'])->name('hero');
    Route::post('/hero', [App\Http\Controllers\Admin\AdminController::class, 'updateHero'])->name('hero.update');
    
    Route::get('/courses', [App\Http\Controllers\Admin\AdminController::class, 'manageCourses'])->name('courses');
    Route::post('/courses', [App\Http\Controllers\Admin\AdminController::class, 'storeCourse'])->name('courses.store');
    Route::patch('/courses/{course}', [App\Http\Controllers\Admin\AdminController::class, 'updateCourse'])->name('courses.update');
    Route::delete('/courses/{course}', [App\Http\Controllers\Admin\AdminController::class, 'destroyCourse'])->name('courses.destroy');
    
    Route::get('/admissions', [App\Http\Controllers\Admin\AdminController::class, 'manageAdmissions'])->name('admissions');
    Route::delete('/admissions/{admission}', [App\Http\Controllers\Admin\AdminController::class, 'destroyAdmission'])->name('admissions.destroy');

    Route::get('/gallery', [App\Http\Controllers\Admin\AdminController::class, 'manageGallery'])->name('gallery');
    Route::post('/gallery', [App\Http\Controllers\Admin\AdminController::class, 'storeGallery'])->name('gallery.store');
    Route::post('/gallery/{galleryItem}', [App\Http\Controllers\Admin\AdminController::class, 'updateGallery'])->name('gallery.update');
    Route::delete('/gallery/{galleryItem}', [App\Http\Controllers\Admin\AdminController::class, 'destroyGallery'])->name('gallery.destroy');

    Route::get('/settings', [App\Http\Controllers\Admin\AdminController::class, 'manageSettings'])->name('settings');
    Route::put('/settings', [App\Http\Controllers\Admin\AdminController::class, 'updateSettings'])->name('settings.update');

    Route::get('/about', [App\Http\Controllers\Admin\AdminController::class, 'manageAbout'])->name('about');
    Route::post('/about', [App\Http\Controllers\Admin\AdminController::class, 'updateAbout'])->name('about.update');

    Route::get('/team', [App\Http\Controllers\Admin\AdminController::class, 'manageTeam'])->name('team');
    Route::post('/team', [App\Http\Controllers\Admin\AdminController::class, 'storeTeam'])->name('team.store');
    Route::post('/team/{teamMember}', [App\Http\Controllers\Admin\AdminController::class, 'updateTeam'])->name('team.update');
    Route::delete('/team/{teamMember}', [App\Http\Controllers\Admin\AdminController::class, 'destroyTeam'])->name('team.destroy');

    Route::get('/testimonials', [App\Http\Controllers\Admin\AdminController::class, 'manageTestimonials'])->name('testimonials');
    Route::post('/testimonials', [App\Http\Controllers\Admin\AdminController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::patch('/testimonials/{testimonial}', [App\Http\Controllers\Admin\AdminController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{testimonial}', [App\Http\Controllers\Admin\AdminController::class, 'destroyTestimonial'])->name('testimonials.destroy');

    Route::get('/page-heroes', [App\Http\Controllers\Admin\AdminController::class, 'managePageHeroes'])->name('page-heroes');
    Route::post('/page-heroes/{pageHero}', [App\Http\Controllers\Admin\AdminController::class, 'updatePageHero'])->name('page-heroes.update');

    Route::get('/homepage', [App\Http\Controllers\Admin\AdminController::class, 'manageHomepage'])->name('homepage');
    Route::put('/homepage', [App\Http\Controllers\Admin\AdminController::class, 'updateHomepage'])->name('homepage.update');

    Route::get('/announcement', [App\Http\Controllers\Admin\AdminController::class, 'manageAnnouncement'])->name('announcement');
    Route::post('/announcement', [App\Http\Controllers\Admin\AdminController::class, 'updateAnnouncement'])->name('announcement.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/fix-images', function () {
    $missingImage = "1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg";
    $replacementImage = "/uploads/director.jpeg";
    
    $updated = [];
    
    // Check Hero
    $heroes = \App\Models\Hero::where('image', 'LIKE', '%' . $missingImage . '%')->get();
    foreach ($heroes as $hero) {
        $hero->image = str_replace($missingImage, basename($replacementImage), $hero->image);
        $hero->save();
        $updated[] = "Hero {$hero->id}";
    }

    // Check Course
    $courses = \App\Models\Course::where('image', 'LIKE', '%' . $missingImage . '%')->get();
    foreach ($courses as $course) {
        $course->image = str_replace($missingImage, basename($replacementImage), $course->image);
        $course->save();
        $updated[] = "Course {$course->id}";
    }

    // Check TeamMember
    $team = \App\Models\TeamMember::where('image', 'LIKE', '%' . $missingImage . '%')->get();
    foreach ($team as $member) {
        $member->image = str_replace($missingImage, basename($replacementImage), $member->image);
        $member->save();
        $updated[] = "TeamMember {$member->id}";
    }

    // Check GalleryItem
    $gallery = \App\Models\GalleryItem::where('image', 'LIKE', '%' . $missingImage . '%')->get();
    foreach ($gallery as $item) {
        $item->image = str_replace($missingImage, basename($replacementImage), $item->image);
        $item->save();
        $updated[] = "GalleryItem {$item->id}";
    }
    
    // Check About
    $about = \App\Models\About::first();
    if ($about && str_contains($about->directorImage, $missingImage)) {
        $about->directorImage = str_replace($missingImage, basename($replacementImage), $about->directorImage);
        $about->save();
        $updated[] = "About directorImage";
    }

    // Homepage content JSON?
    $homepage = \App\Models\Homepage::first();
    if ($homepage) {
        $content = json_encode($homepage->content);
        if (str_contains($content, $missingImage)) {
            $homepage->content = json_decode(str_replace($missingImage, basename($replacementImage), $content), true);
            $homepage->save();
            $updated[] = "Homepage content";
        }
    }

    return response()->json(['status' => 'success', 'updated' => $updated]);
});
