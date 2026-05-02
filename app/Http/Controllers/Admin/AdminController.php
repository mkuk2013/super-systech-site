<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admission;
use App\Models\Course;
use App\Models\Hero;
use App\Models\Settings;
use App\Models\About;
use App\Models\TeamMember;
use App\Models\GalleryItem;
use App\Models\Testimonial;
use App\Models\PageHero;
use App\Models\Layout;
use App\Models\Homepage;
use App\Models\Announcement;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalAdmissions' => Admission::count(),
                'totalCourses' => Course::count(),
                'totalTeamMembers' => TeamMember::count(),
                'totalGalleryItems' => GalleryItem::count(),
            ],
            'recentAdmissions' => Admission::latest()->take(5)->get(),
        ]);
    }

    public function manageHero()
    {
        return Inertia::render('Admin/ManageHero', [
            'hero' => Hero::first(),
            'pageHeroes' => PageHero::all(),
        ]);
    }

    public function updateHero(Request $request)
    {
        $hero = Hero::first();
        $hero->update($request->all());
        return back()->with('success', 'Hero section updated successfully!');
    }

    public function manageCourses()
    {
        return Inertia::render('Admin/ManageCourses', [
            'courses' => Course::orderBy('order')->get(),
        ]);
    }

    public function storeCourse(Request $request)
    {
        Course::create($request->all());
        return back()->with('success', 'Course added successfully!');
    }

    public function updateCourse(Request $request, Course $course)
    {
        $course->update($request->all());
        return back()->with('success', 'Course updated successfully!');
    }

    public function destroyCourse(Course $course)
    {
        $course->delete();
        return back()->with('success', 'Course deleted successfully!');
    }

    public function manageAdmissions()
    {
        return Inertia::render('Admin/ManageAdmissions', [
            'admissions' => Admission::latest()->get(),
        ]);
    }

    public function destroyAdmission(Admission $admission)
    {
        $admission->delete();
        return back()->with('success', 'Admission record deleted successfully!');
    }

    public function manageGallery()
    {
        return Inertia::render('Admin/ManageGallery', [
            'gallery' => GalleryItem::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function storeGallery(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'required|image|max:5120', // 5MB max
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            // Move to public/uploads
            $file->move(public_path('uploads'), $filename);
            $validated['image'] = '/uploads/' . $filename;
        }

        GalleryItem::create($validated);
        return back()->with('success', 'Gallery item added successfully!');
    }

    public function destroyGallery(GalleryItem $galleryItem)
    {
        if ($galleryItem->image && file_exists(public_path($galleryItem->image))) {
            unlink(public_path($galleryItem->image));
        }
        $galleryItem->delete();
        return back()->with('success', 'Gallery item deleted successfully!');
    }

    public function updateGallery(Request $request, GalleryItem $galleryItem)
    {
        $data = $request->validate([
            'title'    => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'image'    => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            // Delete old file if it exists
            if ($galleryItem->image && file_exists(public_path($galleryItem->image))) {
                unlink(public_path($galleryItem->image));
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $data['image'] = '/uploads/' . $filename;
        } else {
            unset($data['image']); // keep existing image
        }

        $galleryItem->update($data);
        return back()->with('success', 'Gallery item updated successfully!');
    }

    public function manageSettings()
    {
        return Inertia::render('Admin/ManageSettings', [
            'settings' => Settings::first(),
        ]);
    }

    public function updateSettings(Request $request)
    {
        $settings = Settings::first();
        if ($settings) {
            $settings->update($request->all());
        } else {
            Settings::create($request->all());
        }
        return back()->with('success', 'Settings updated successfully!');
    }

    // ─── ABOUT ───────────────────────────────────────────────────────────────

    public function manageAbout()
    {
        return Inertia::render('Admin/ManageAbout', [
            'about' => About::first(),
        ]);
    }

    public function updateAbout(Request $request)
    {
        $about = About::first();
        $data = $request->except(['directorImageFile', 'principalImageFile']);

        if ($request->hasFile('directorImageFile')) {
            $file = $request->file('directorImageFile');
            $filename = time() . '_dir_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $data['directorImage'] = '/uploads/' . $filename;
        }

        if ($request->hasFile('principalImageFile')) {
            $file = $request->file('principalImageFile');
            $filename = time() . '_pri_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $data['principalImage'] = '/uploads/' . $filename;
        }

        if (isset($data['achievements']) && is_string($data['achievements'])) {
            $data['achievements'] = json_decode($data['achievements'], true);
        }

        if ($about) {
            $about->update($data);
        } else {
            About::create($data);
        }
        return back()->with('success', 'About page updated successfully!');
    }

    // ─── TEAM ────────────────────────────────────────────────────────────────

    public function manageTeam()
    {
        return Inertia::render('Admin/ManageTeam', [
            'team' => \App\Models\TeamMember::orderBy('order')->get(),
        ]);
    }

    public function storeTeam(Request $request)
    {
        $data = $request->except(['imageFile']);
        if ($request->hasFile('imageFile')) {
            $file = $request->file('imageFile');
            $filename = time() . '_team_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $data['image'] = '/uploads/' . $filename;
        }
        \App\Models\TeamMember::create($data);
        return back()->with('success', 'Team member added!');
    }

    public function updateTeam(Request $request, \App\Models\TeamMember $teamMember)
    {
        $data = $request->except(['imageFile']);
        if ($request->hasFile('imageFile')) {
            $file = $request->file('imageFile');
            $filename = time() . '_team_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $data['image'] = '/uploads/' . $filename;
        }
        $teamMember->update($data);
        return back()->with('success', 'Team member updated!');
    }

    public function destroyTeam(\App\Models\TeamMember $teamMember)
    {
        $teamMember->delete();
        return back()->with('success', 'Team member deleted!');
    }

    // ─── TESTIMONIALS ────────────────────────────────────────────────────────

    public function manageTestimonials()
    {
        return Inertia::render('Admin/ManageTestimonials', [
            'testimonials' => Testimonial::latest()->get(),
        ]);
    }

    public function storeTestimonial(Request $request)
    {
        Testimonial::create($request->validate([
            'name'    => 'required|string|max:255',
            'course'  => 'required|string|max:255',
            'message' => 'required|string',
            'rating'  => 'required|integer|min:1|max:5',
        ]));
        return back()->with('success', 'Testimonial added!');
    }

    public function updateTestimonial(Request $request, Testimonial $testimonial)
    {
        $testimonial->update($request->validate([
            'name'    => 'required|string|max:255',
            'course'  => 'required|string|max:255',
            'message' => 'required|string',
            'rating'  => 'required|integer|min:1|max:5',
        ]));
        return back()->with('success', 'Testimonial updated!');
    }

    public function destroyTestimonial(Testimonial $testimonial)
    {
        $testimonial->delete();
        return back()->with('success', 'Testimonial deleted!');
    }

    // ─── PAGE HEROES ─────────────────────────────────────────────────────────

    public function managePageHeroes()
    {
        return Inertia::render('Admin/ManagePageHeroes', [
            'pageHeroes' => PageHero::all()->keyBy('pageKey'),
        ]);
    }

    public function updatePageHero(Request $request, PageHero $pageHero)
    {
        $data = $request->validate([
            'badge'    => 'nullable|string|max:255',
            'title'    => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
            'image'    => 'nullable|image|max:5120', // 5MB max
        ]);

        if ($request->hasFile('image')) {
            // Delete old file if it exists
            if ($pageHero->backgroundImage && file_exists(public_path($pageHero->backgroundImage))) {
                unlink(public_path($pageHero->backgroundImage));
            }
            $file = $request->file('image');
            $filename = time() . '_hero_' . $pageHero->pageKey . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads'), $filename);
            $data['backgroundImage'] = '/uploads/' . $filename;
        }
        
        unset($data['image']); // Don't save the image file object to DB

        $pageHero->update($data);
        return back()->with('success', 'Page hero updated!');
    }

    // ─── HOMEPAGE ────────────────────────────────────────────────────────────

    public function manageHomepage()
    {
        return Inertia::render('Admin/ManageHomepage', [
            'homepage' => Homepage::first(),
        ]);
    }

    public function updateHomepage(Request $request)
    {
        $homepage = Homepage::first();
        $sections = $request->input('sections');
        if (is_string($sections)) {
            $sections = json_decode($sections, true);
        }
        if ($homepage) {
            $homepage->update(['sections' => $sections]);
        } else {
            Homepage::create(['sections' => $sections]);
        }
        return back()->with('success', 'Homepage updated successfully!');
    }

    // ─── ANNOUNCEMENT POPUP ──────────────────────────────────────────────────

    public function manageAnnouncement()
    {
        return Inertia::render('Admin/ManageAnnouncement', [
            'announcement' => Announcement::first() ?? Announcement::create([
                'show' => false,
                'type' => 'text',
                'title' => 'Special Announcement',
                'description' => 'Welcome to our institute!',
            ]),
        ]);
    }

    public function updateAnnouncement(Request $request)
    {
        $announcement = Announcement::first();
        $data = $request->except(['imageFile']);

        // Handle boolean conversion from request
        $data['show'] = filter_var($request->input('show'), FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('imageFile')) {
            // Delete old file
            if ($announcement->image && file_exists(public_path($announcement->image))) {
                unlink(public_path($announcement->image));
            }
            $file = $request->file('imageFile');
            $filename = time() . '_popup_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $data['image'] = '/uploads/' . $filename;
        }

        $announcement->update($data);
        return back()->with('success', 'Promotional popup updated successfully!');
    }
}
