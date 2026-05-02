<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Settings;
use App\Models\Hero;
use App\Models\About;
use App\Models\Course;
use App\Models\TeamMember;
use App\Models\GalleryItem;
use App\Models\Testimonial;
use App\Models\PageHero;
use App\Models\Admission;
use App\Models\Layout;
use App\Models\Homepage;
use Illuminate\Support\Facades\File;

class SiteContentSeeder extends Seeder
{
    public function run(): void
    {
        $jsonPath = base_path('backup_nextjs/data/content.json');
        if (!File::exists($jsonPath)) {
            $this->command->error("Data file not found at $jsonPath");
            return;
        }

        $data = json_decode(File::get($jsonPath), true);

        if (isset($data['settings'])) {
            Settings::updateOrCreate(['id' => 1], $data['settings']);
        }

        if (isset($data['hero'])) {
            Hero::updateOrCreate(['id' => 1], $data['hero']);
        }

        if (isset($data['about'])) {
            // Prisma used principalImage, etc. But migration used principalImage.
            // Map keys if necessary. Prisma: principalImage, principalTitle, principalName, principalMessage, achievements, description, mission, vision
            About::updateOrCreate(['id' => 1], $data['about']);
        }

        if (isset($data['courses'])) {
            foreach ($data['courses'] as $course) {
                Course::updateOrCreate(['id' => $course['id']], $course);
            }
        }

        if (isset($data['team'])) {
            foreach ($data['team'] as $member) {
                TeamMember::updateOrCreate(['id' => $member['id']], $member);
            }
        }

        if (isset($data['gallery'])) {
            foreach ($data['gallery'] as $item) {
                GalleryItem::updateOrCreate(['id' => $item['id']], $item);
            }
        }

        if (isset($data['testimonials'])) {
            foreach ($data['testimonials'] as $t) {
                Testimonial::updateOrCreate(['id' => $t['id']], $t);
            }
        }

        if (isset($data['admissions'])) {
            foreach ($data['admissions'] as $a) {
                Admission::updateOrCreate(['id' => $a['id']], $a);
            }
        }

        if (isset($data['pageHeroes'])) {
            foreach ($data['pageHeroes'] as $key => $ph) {
                PageHero::updateOrCreate(['pageKey' => $key], [
                    'title' => $ph['title'],
                    'subtitle' => $ph['subtitle'] ?? null,
                    'badge' => $ph['badge'] ?? null,
                ]);
            }
        }

        if (isset($data['layout'])) {
            Layout::updateOrCreate(['id' => 1], $data['layout']);
        }

        if (isset($data['homepage'])) {
            Homepage::updateOrCreate(['id' => 1], $data['homepage']);
        }
    }
}
