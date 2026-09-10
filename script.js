/* ==========================================================================
   ZESTYMEALHUT - Interactive Culinary & Hearth Gastronomy Experience
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. FAQ Accordion Interaction
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. Interactive Meal Macro & Flavor Architect
  const dietarySelect = document.getElementById('meal-diet-focus');
  const windowSelect = document.getElementById('meal-time-window');
  const coursesContainer = document.getElementById('courses-display');
  const formulaTitle = document.getElementById('menu-formula-title');
  const formulaDesc = document.getElementById('menu-formula-desc');

  const mealFormulas = {
    'mediterranean-lunch': {
      title: 'The Coastal Longevity Luncheon',
      desc: 'Rich in polyphenol extra-virgin olive oil, omega-3 fatty acids, and vibrant sun-ripened produce.',
      courses: [
        { course: 'Starter', name: 'Heirloom Tomato & Whipped Ricotta Toast', note: 'Wild oregano & aged pomegranate reduction' },
        { course: 'Entrée', name: 'Pan-Seared Wild Salmon Fillet', note: 'Charred asparagus, Meyer lemon & caperberries' },
        { course: 'Finishing Touch', name: 'Raw Honey & Greek Yogurt Parfait', note: 'Crushed pistachio & wild blackberries' }
      ]
    },
    'mediterranean-dinner': {
      title: 'The Aegean Twilight Hearth Banquet',
      desc: 'Slow-simmered seafood broth, woodfired sourdough, and herb-crusted legumes for restorative evening nourishment.',
      courses: [
        { course: 'Starter', name: 'Smoked Eggplant Baba Ganoush', note: 'Warm sourdough flatbread & sesame zaatar' },
        { course: 'Entrée', name: 'Clay-Pot Braised Halibut & Fennel', note: 'Saffron tomato fumet & baby artichokes' },
        { course: 'Finishing Touch', name: 'Spiced Fig & Almond Olive Oil Cake', note: 'Orange blossom infusion' }
      ]
    },
    'protein-lunch': {
      title: 'The High-Performance Hearth Fuel',
      desc: 'Macro-balanced lean pasture poultry, ancient grains, and enzyme-rich fermented greens.',
      courses: [
        { course: 'Starter', name: 'Bone Broth & Shiitake Elixir', note: 'Ginger root, scallions & cold-pressed sesame' },
        { course: 'Entrée', name: 'Wood-Grilled Pasture Chicken Breast', note: 'Quinoa pilaf, roasted beets & chimichurri' },
        { course: 'Finishing Touch', name: 'Spiced Golden Turmeric Chia Bowl', note: 'Toasted coconut flakes & chia gel' }
      ]
    },
    'protein-dinner': {
      title: 'The Prime Hearth Ember Feast',
      desc: 'Charred cast-iron pasture steaks, roasted bone marrow, and nutrient-dense brassicas.',
      courses: [
        { course: 'Starter', name: 'Charred Romanesco with Hazelnut Dukkah', note: 'Smoked sea salt & garlic emulsion' },
        { course: 'Entrée', name: 'Oak-Smoked Heritage Ribeye', note: 'Cast-iron potato galette & roasted shallots' },
        { course: 'Finishing Touch', name: 'Dark Raw Cacao Tart', note: 'Flaked Maldon salt & espresso dust' }
      ]
    },
    'plant-lunch': {
      title: 'The Biodynamic Garden Vitality Plate',
      desc: '100% plant-derived vitality featuring sprouted ancient grains, raw krauts, and avocado fats.',
      courses: [
        { course: 'Starter', name: 'Cold-Pressed Cucumber & Gazpacho', note: 'Heirloom yellow peppers & basil oil' },
        { course: 'Entrée', name: 'Crispy Tempeh & Roasted Kabocha Bowl', note: 'Avocado rose, tahini goddess dressing' },
        { course: 'Finishing Touch', name: 'Acai & Sprouted Hemp Seed Crunch', note: 'Wild blueberry glaze' }
      ]
    },
    'plant-dinner': {
      title: 'The Harvest Forest Mushroom Symphony',
      desc: 'Wood-roasted king oyster mushrooms, truffled polenta, and braised Tuscan kale.',
      courses: [
        { course: 'Starter', name: 'Roasted Butternut Squash Velouté', note: 'Crispy sage leaves & toasted pumpkin seeds' },
        { course: 'Entrée', name: 'Woodfired Porcini & Truffle Tagliatelle', note: 'Handmade semolina pasta & garlic crumbs' },
        { course: 'Finishing Touch', name: 'Poached Bosc Pear in Spiced Cider', note: 'Cinnamon quill & star anise broth' }
      ]
    }
  };

  function updateMealFormula() {
    if (!dietarySelect || !windowSelect || !coursesContainer) return;
    const key = `${dietarySelect.value}-${windowSelect.value}`;
    const formula = mealFormulas[key] || mealFormulas['mediterranean-lunch'];

    if (formulaTitle) formulaTitle.textContent = formula.title;
    if (formulaDesc) formulaDesc.textContent = formula.desc;

    coursesContainer.innerHTML = formula.courses.map(c => `
      <div class="course-card">
        <span class="course-tag">${c.course}</span>
        <h4>${c.name}</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">${c.note}</p>
      </div>
    `).join('');
  }

  if (dietarySelect && windowSelect) {
    dietarySelect.addEventListener('change', updateMealFormula);
    windowSelect.addEventListener('change', updateMealFormula);
    updateMealFormula();
  }

  // 5. Interactive Botanical Herb Harmonizer
  const herbSelect = document.getElementById('harmonizer-herb');
  const pairingContainer = document.getElementById('pairing-swatches-display');
  const herbExplanation = document.getElementById('herb-explanation');

  const herbPairings = {
    'rosemary': {
      desc: 'Resinous, pine-forward rosemary thrives when matched with charred blood orange, garlic emulsion, and roasted lamb or sourdough crusts.',
      pairings: [
        { name: 'Blood Orange Gastrique', role: 'Acid Balance' },
        { name: 'Cast-Iron Garlic Confit', role: 'Aromatic Depth' },
        { name: 'Pecan Wood Smoke', role: 'Thermal Note' }
      ]
    },
    'basil': {
      desc: 'Sweet, anise-peppery fresh basil pairs sublimely with cold-pressed Meyer lemon, aged balsamic vinegar, and burrata or wild salmon.',
      pairings: [
        { name: 'Cold-Pressed Meyer Lemon', role: 'Zesty Spark' },
        { name: 'Extra-Virgin Olive Oil', role: 'Fat Emulsion' },
        { name: 'Toasted Pine Nuts', role: 'Nutty Crunch' }
      ]
    },
    'thyme': {
      desc: 'Earthy, floral French thyme harmonizes effortlessly with tart Key lime, roasted shallots, wild mushrooms, and pasture poultry.',
      pairings: [
        { name: 'Key Lime & Ginger Shrub', role: 'Zero-Proof Spritzer' },
        { name: 'Caramelized Shallot Butter', role: 'Savory Umami' },
        { name: 'White Oak Charcoal', role: 'Clean Hearth Char' }
      ]
    },
    'tarragon': {
      desc: 'Delicate licorice-accented tarragon elevates pink grapefruit reductions, roasted asparagus, Dijon mustard vinaigrettes, and delicate sea scallops.',
      pairings: [
        { name: 'Pink Grapefruit Glaze', role: 'Bright Citrus' },
        { name: 'Whole-Grain Mustard', role: 'Piquant Accent' },
        { name: 'Chilled Cucumber Gazpacho', role: 'Cooling Contrast' }
      ]
    }
  };

  function updateHerbPairing() {
    if (!herbSelect || !pairingContainer) return;
    const pairing = herbPairings[herbSelect.value] || herbPairings['rosemary'];
    if (herbExplanation) herbExplanation.textContent = pairing.desc;

    pairingContainer.innerHTML = pairing.pairings.map(p => `
      <div class="swatch-culinary">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-basil); font-weight: 700;">${p.role}</span>
        <h4>${p.name}</h4>
      </div>
    `).join('');
  }

  if (herbSelect) {
    herbSelect.addEventListener('change', updateHerbPairing);
    updateHerbPairing();
  }

  // 6. Cookie Consent
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookieBtn = document.getElementById('accept-cookies');
  const declineCookieBtn = document.getElementById('decline-cookies');

  if (cookieBanner) {
    if (!localStorage.getItem('zestymealhut_cookies_accepted')) {
      setTimeout(() => {
        cookieBanner.classList.add('active');
      }, 1000);
    }

    if (acceptCookieBtn) {
      acceptCookieBtn.addEventListener('click', () => {
        localStorage.setItem('zestymealhut_cookies_accepted', 'true');
        cookieBanner.classList.remove('active');
      });
    }

    if (declineCookieBtn) {
      declineCookieBtn.addEventListener('click', () => {
        localStorage.setItem('zestymealhut_cookies_accepted', 'declined');
        cookieBanner.classList.remove('active');
      });
    }
  }

  // 7. Form Handlers
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : 'Submit';

      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Table...';
        btn.disabled = true;
      }

      setTimeout(() => {
        alert('Thank you for reserving with ZestyMealHut. Our Executive Chef Concierge will confirm your tasting table details shortly.');
        form.reset();
        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      }, 700);
    });
  });
});
