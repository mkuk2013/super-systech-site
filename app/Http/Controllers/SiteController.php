<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Settings;
use App\Models\Hero;
use App\Models\About;
use App\Models\Course;
use App\Models\TeamMember;
use App\Models\GalleryItem;
use App\Models\Testimonial;
use App\Models\PageHero;
use App\Models\Layout;
use App\Models\Homepage;
use App\Models\Admission;
use App\Models\Announcement;
use Inertia\Inertia;

class SiteController extends Controller
{
    private function getSiteContent()
    {
        $settings = Settings::first();
        $layout = Layout::first();
        $pageHeroes = PageHero::all()->keyBy('pageKey')->map(function($hero) {
            if (str_contains($hero->backgroundImage, '1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg')) {
                $hero->backgroundImage = str_replace('1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg', 'director.jpeg', $hero->backgroundImage);
            }
            return $hero;
        });

        // Append active courses to marquee if enabled
        if ($settings && $settings->showAdmissionsInMarquee) {
            $activeCourses = \App\Models\Course::where('admissionsOpen', true)->pluck('title')->toArray();
            if (!empty($activeCourses)) {
                $coursesList = implode(', ', $activeCourses);
                $settings->marqueeText .= " • Admissions Open for: " . $coursesList . " • Apply Now!";
            }
        }

        return [
            'settings' => $settings,
            'layout' => $layout,
            'pageHeroes' => $pageHeroes,
            'announcement' => Announcement::first(),
        ];
    }

    public function storeAdmission(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'course' => 'required|string',
            'message' => 'nullable|string',
        ]);

        Admission::create($validated);

        return back()->with('success', 'Application submitted successfully!');
    }

    public function index()
    {
        $siteContent = $this->getSiteContent();
        
        $about = About::first();
        if ($about && str_contains($about->directorImage, '1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg')) {
            $about->directorImage = str_replace('1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg', 'director.jpeg', $about->directorImage);
        }

        return Inertia::render('Home', [
            'hero' => Hero::first(),
            'about' => $about,
            'courses' => Course::where('featured', true)->orderBy('order')->get(),
            'testimonials' => Testimonial::all(),
            'homepage' => Homepage::first(),
            'allCourses' => Course::orderBy('order')->get(),
            'settings' => $siteContent['settings'],
            'layout' => $siteContent['layout'],
            'siteContent' => $siteContent,
        ]);
    }

    public function about()
    {
        $about = About::first();
        if ($about && str_contains($about->directorImage, '1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg')) {
            $about->directorImage = str_replace('1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg', 'director.jpeg', $about->directorImage);
        }

        return Inertia::render('About', [
            'about' => $about,
            'siteContent' => $this->getSiteContent(),
        ]);
    }

    public function courses()
    {
        return Inertia::render('Courses', [
            'courses' => Course::orderBy('order')->get(),
            'siteContent' => $this->getSiteContent(),
        ]);
    }

    public function gallery()
    {
        $gallery = GalleryItem::orderBy('created_at', 'desc')->get()->map(function($item) {
            if (str_contains($item->image, '1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg')) {
                $item->image = str_replace('1777573074301_whatsapp_image_2026_04_30_at_2.55.30_pm.jpeg', 'director.jpeg', $item->image);
            }
            return $item;
        });

        return Inertia::render('Gallery', [
            'gallery' => $gallery,
            'siteContent' => $this->getSiteContent(),
        ]);
    }

    public function team()
    {
        return Inertia::render('Team', [
            'team' => TeamMember::orderBy('order')->get(),
            'siteContent' => $this->getSiteContent(),
        ]);
    }

    public function admissions()
    {
        return Inertia::render('Admissions', [
            'courses' => Course::where('admissionsOpen', true)->get(),
            'siteContent' => $this->getSiteContent(),
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact', [
            'siteContent' => $this->getSiteContent(),
        ]);
    }

    public function privacyPolicy()
    {
        return Inertia::render('PrivacyPolicy', [
            'siteContent' => $this->getSiteContent(),
        ]);
    }

    public function termsOfService()
    {
        return Inertia::render('TermsOfService', [
            'siteContent' => $this->getSiteContent(),
        ]);
    }
}
