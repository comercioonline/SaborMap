// ============================================
// SISTEMA DE ALMACENAMIENTO COMPARTIDO SABORMAP
// Sincroniza datos entre Admin y Página Principal
// ============================================

const SaborMapStorage = {
    // Claves de localStorage
    KEYS: {
        USERS: 'sabormap_users',
        PLACES: 'sabormap_places',
        REVIEWS: 'sabormap_reviews',
        REWARDS: 'sabormap_rewards',
        REDEMPTIONS: 'sabormap_redemptions',
        ACTIVITY_LOG: 'sabormap_activity',
        LAST_SYNC: 'sabormap_last_sync',
        CURRENT_USER: 'sabormap_current_user'
    },

    // Datos por defecto (se usan solo si no hay datos guardados)
    DEFAULTS: {
        users: [
            { id: 1, firstName: "María", lastName: "González", email: "maria.g@email.com", phone: "+53 55512345", role: "admin", status: "active", points: 2450, joined: "2024-01-15", lastActive: "2026-02-20", favorites: [1,3,5], reviews: 12, verified: true },
            { id: 2, firstName: "Carlos", lastName: "Rodríguez", email: "carlos.r@email.com", phone: "+53 55567890", role: "critic", status: "active", points: 1890, joined: "2024-03-22", lastActive: "2026-02-19", favorites: [2,4,6,8], reviews: 45, verified: true },
            { id: 3, firstName: "Ana", lastName: "Martínez", email: "ana.m@email.com", phone: "+53 55598765", role: "user", status: "active", points: 320, joined: "2025-06-10", lastActive: "2026-02-18", favorites: [1,7], reviews: 3, verified: false },
            { id: 4, firstName: "Juan", lastName: "Pérez", email: "juan.p@restaurante.com", phone: "+53 55545678", role: "owner", status: "active", points: 150, joined: "2024-08-05", lastActive: "2026-02-20", favorites: [], reviews: 0, verified: true, business: "El Asador" },
            { id: 5, firstName: "Laura", lastName: "Silva", email: "laura.s@email.com", phone: "+53 55578901", role: "user", status: "inactive", points: 0, joined: "2025-11-20", lastActive: "2025-12-15", favorites: [], reviews: 0, verified: false },
            { id: 6, firstName: "Pedro", lastName: "López", email: "pedro.l@email.com", phone: "+53 55523456", role: "critic", status: "suspended", points: 890, joined: "2024-05-12", lastActive: "2025-10-30", favorites: [3,9], reviews: 23, verified: true, suspensionReason: "Violación de términos" },
            { id: 7, firstName: "Sofia", lastName: "Hernández", email: "sofia.h@email.com", phone: "+53 55587654", role: "user", status: "active", points: 780, joined: "2025-02-14", lastActive: "2026-02-19", favorites: [2,5,8], reviews: 8, verified: true },
            { id: 8, firstName: "Diego", lastName: "Fernández", email: "diego.f@email.com", phone: "+53 55534567", role: "admin", status: "active", points: 3100, joined: "2023-12-01", lastActive: "2026-02-20", favorites: [1,2,3,4,5], reviews: 67, verified: true }
        ],
        
        places: [
            {
                id: 1,
                name: "Yo Invito",
                category: "restaurant",
                image: "imagenes/SaveClip.App_621065536_17947772700087375_2365517714641190233_n_640.webp",
                rating: 4.8,
                reviews: 324,
                address: "📍Calle 3era, esquina a D, Vedado",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4428.31293970352!2d-82.40070568849433!3d23.142295711761346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd7753ed68eb81%3A0xc7348a78249be9df!2sYo%20Invito...!5e1!3m2!1ses!2sus!4v1771418149936!5m2!1ses!2sus",
                description: "Contamos con área infantil para el disfrute de los peques. Siéntete como en casa 😊😌",
                specialties: ["Variedad de comida cubana e internacional"],
                priceRange: "$$$",
                menu: {
                    entrees: [
                        { item: "Tostones Rellenos", price: "$3.500", desc: "De jamón y queso, con salsa tártara" },
                        { item: "Croquetas de la Casa", price: "$2.800", desc: "6 unidades, bechamel cremosa" },
                        { item: "Ensalada Mixta", price: "$2.800", desc: "Lechuga, tomate, cebolla y pepino" },
                        { item: "Sopa del Día", price: "$2.200", desc: "Consultar variedad disponible" }
                    ],
                    mains: [
                        { item: "Bife de Chorizo (400g)", price: "$12.500", desc: "Corte premium con guarnición" },
                        { item: "Asado para 2 personas", price: "$18.900", desc: "Vacio, entraña, chorizo y morcilla" },
                        { item: "Pollo Grille", price: "$8.500", desc: "Pechuga marinada con vegetales" },
                        { item: "Ropa Vieja", price: "$9.200", desc: "Clásico cubano con arroz y plátano" }
                    ],
                    pasta: [
                        { item: "Spaghetti Bolognesa", price: "$7.500", desc: "Salsa de tomate con carne molida" },
                        { item: "Fettuccine Alfredo", price: "$8.200", desc: "Salsa cremosa con pollo" },
                        { item: "Lasagna de Carne", price: "$8.800", desc: "Capas de pasta con bechamel" }
                    ],
                    sandwiches: [
                        { item: "Cubano Tradicional", price: "$5.500", desc: "Jamón, cerdo, queso, pepinillos y mostaza" },
                        { item: "Pan con Lechón", price: "$6.200", desc: "Cerdo asado, cebolla crujiente y mojo" },
                        { item: "Hamburguesa Clásica", price: "$6.800", desc: "Carne 150g, queso cheddar, vegetales" },
                        { item: "Chivito Uruguayo", price: "$8.500", desc: "Lomo, jamón, queso, huevo y mayonesa" },
                        { item: "Sándwich de Pollo", price: "$5.800", desc: "Pechuga grille, lechuga y tomate" }
                    ],
                    desserts: [
                        { item: "Flan de Caramelo", price: "$2.500", desc: "Casero, receta tradicional" },
                        { item: "Tarta de Queso", price: "$3.200", desc: "Con mermelada de frutos rojos" },
                        { item: "Helado Artesanal", price: "$2.800", desc: "2 bolas, varios sabores" }
                    ],
                    drinks: [
                        { item: "Vino Malbec Reserva", price: "$8.500", desc: "Botella de bodega Trapiche" },
                        { item: "Cerveza Nacional", price: "$2.200", desc: "Cristal o Bucanero" },
                        { item: "Refrescos Importados", price: "$2.800", desc: "Coca-Cola, Sprite, Fanta" },
                        { item: "Agua Natural", price: "$1.500", desc: "500ml" }
                    ]
                },
                hours: "⏰️ Lun-Dom: 12:00pm-23:00pm",
                phone: "#",
                status: "active",
                views: 1500,
                ownerId: null,
                joined: "2024-01-10"
            },
            {
                id: 2,
                name: "5 Esquinas Trattoria",
                category: "restaurant",
                image: "imagenes/SaveClip.App_534753696_18528342661036935_3021730175036088919_n_640.jpg",
                rating: 4.9,
                reviews: 189,
                address: "🗺️📍calle Habana esq. Cuarteles, Habana Vieja",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5!2d-58.42!3d-34.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM0JzQ4LjAiUyA1OMKwMjUnMTIuMCJX!5e0!3m2!1ses!2sar!4v1234567890",
                description: "Creamos verdaderas obras de arte con el más puro sabor italiano.",
                specialties: ["Comida Italiana"],
                priceRange: "$$",
                menu: {
                    entrees: [
                        { item: "Bruschetta Clásica", price: "$3.200", desc: "Tomate, albahaca y aceite de oliva" },
                        { item: "Provoleta", price: "$4.200", desc: "Queso provolone a la parrilla" },
                        { item: "Antipasto Mixto", price: "$5.800", desc: "Jamón, queso, aceitunas y pepinillos" }
                    ],
                    mains: [
                        { item: "Osso Buco", price: "$14.500", desc: "Con risotto milanés" },
                        { item: "Saltimbocca", price: "$13.200", desc: "Lomo de ternera con jamón y salvia" }
                    ],
                    pasta: [
                        { item: "Spaghetti Carbonara", price: "$9.500", desc: "Con huevo, panceta y queso pecorino" },
                        { item: "Ravioli de Ricotta", price: "$10.200", desc: "Con salsa de tomate y albahaca" },
                        { item: "Tagliatelle al Pesto", price: "$9.800", desc: "Salsa genovesa casera" },
                        { item: "Lasagna Bolognesa", price: "$11.500", desc: "Receta tradicional emiliana" }
                    ],
                    sandwiches: [
                        { item: "Panini Caprese", price: "$6.500", desc: "Mozzarella, tomate y pesto" },
                        { item: "Ciabatta de Pollo", price: "$7.200", desc: "Pechuga, rúcula y parmesano" },
                        { item: "Focaccia de Jamón", price: "$6.800", desc: "Jamón serrano y tomates secos" }
                    ],
                    desserts: [
                        { item: "Tiramisú", price: "$4.500", desc: "Auténtico italiano con mascarpone" },
                        { item: "Panna Cotta", price: "$3.800", desc: "Con coulis de frutos rojos" },
                        { item: "Cannoli Siciliano", price: "$3.200", desc: "Relleno de ricotta y chocolate" }
                    ],
                    drinks: [
                        { item: "Chianti Classico", price: "$12.000", desc: "Botella DOCG" },
                        { item: "Prosecco", price: "$8.500", desc: "Espumante italiano" },
                        { item: "Aperol Spritz", price: "$4.200", desc: "Cóctel clásico veneciano" }
                    ]
                },
                hours: "⏰️ Mar-Dom: 18:00-02:00",
                phone: "#",
                status: "active",
                views: 1200,
                ownerId: null,
                joined: "2024-02-15"
            },
            // ... (resto de locales con status, views, ownerId, joined)
        ],
        
        reviews: [
            { id: 1, userId: 2, placeId: 1, rating: 5, text: "Excelente comida y ambiente familiar. Altamente recomendado.", status: "approved", date: "2026-02-18", likes: 12, photos: 2 },
            { id: 2, userId: 3, placeId: 2, rating: 4, text: "Muy buena pasta, aunque un poco caro.", status: "approved", date: "2026-02-17", likes: 5, photos: 0 },
            { id: 3, userId: 7, placeId: 3, rating: 5, text: "Los postres son increíbles, especialmente el cheesecake.", status: "pending", date: "2026-02-19", likes: 0, photos: 3 },
            { id: 4, userId: 2, placeId: 4, rating: 3, text: "La comida estuvo bien pero el servicio fue lento.", status: "approved", date: "2026-02-15", likes: 8, photos: 1 },
            { id: 5, userId: 5, placeId: 1, rating: 1, text: "No me gustó nada, la comida fría y cara.", status: "rejected", date: "2026-02-10", likes: 2, photos: 0, rejectionReason: "Contenido inapropiado" },
            { id: 6, userId: 8, placeId: 6, rating: 5, text: "El mejor helado de pistacho que he probado.", status: "approved", date: "2026-02-16", likes: 15, photos: 2 },
            { id: 7, userId: 3, placeId: 7, rating: 4, text: "Buenos tacos, precios accesibles.", status: "approved", date: "2026-02-14", likes: 6, photos: 0 },
            { id: 8, userId: 6, placeId: 2, rating: 2, text: "No cumplió con mis expectativas.", status: "pending", date: "2026-02-19", likes: 1, photos: 0 }
        ],
        
        rewards: [
            { id: 1, name: "Café Gratis", description: "Café espresso en cualquier cafetería asociada", pointsCost: 100, quantity: -1, icon: "coffee", redemptions: 45, active: true },
            { id: 2, name: "20% Descuento", description: "En restaurantes seleccionados", pointsCost: 250, quantity: 100, icon: "percent", redemptions: 23, active: true },
            { id: 3, name: "Cena para 2", description: "Experiencia gastronómica completa", pointsCost: 1000, quantity: 10, icon: "utensils", redemptions: 5, active: true },
            { id: 4, name: "Entrada VIP", description: "Acceso prioritario a eventos gastronómicos", pointsCost: 500, quantity: 20, icon: "ticket", redemptions: 8, active: true },
            { id: 5, name: "Menú Degustación", description: "Menú de 5 tiempos en restaurante premium", pointsCost: 750, quantity: 5, icon: "crown", redemptions: 2, active: true }
        ],
        
        redemptions: [
            { id: 1, userId: 1, rewardId: 1, points: 100, date: "2026-02-18", status: "completed" },
            { id: 2, userId: 2, rewardId: 2, points: 250, date: "2026-02-17", status: "completed" },
            { id: 3, userId: 3, rewardId: 1, points: 100, date: "2026-02-16", status: "pending" },
            { id: 4, userId: 7, rewardId: 3, points: 1000, date: "2026-02-15", status: "completed" },
            { id: 5, userId: 8, rewardId: 4, points: 500, date: "2026-02-14", status: "completed" }
        ]
    },

    // ============================================
    // MÉTODOS DE OBTENCIÓN DE DATOS
    // ============================================

    getUsers() {
        const data = localStorage.getItem(this.KEYS.USERS);
        return data ? JSON.parse(data) : [...this.DEFAULTS.users];
    },

    getPlaces() {
        const data = localStorage.getItem(this.KEYS.PLACES);
        return data ? JSON.parse(data) : [...this.DEFAULTS.places];
    },

    getReviews() {
        const data = localStorage.getItem(this.KEYS.REVIEWS);
        return data ? JSON.parse(data) : [...this.DEFAULTS.reviews];
    },

    getRewards() {
        const data = localStorage.getItem(this.KEYS.REWARDS);
        return data ? JSON.parse(data) : [...this.DEFAULTS.rewards];
    },

    getRedemptions() {
        const data = localStorage.getItem(this.KEYS.REDEMPTIONS);
        return data ? JSON.parse(data) : [...this.DEFAULTS.redemptions];
    },

    getActivityLog() {
        const data = localStorage.getItem(this.KEYS.ACTIVITY_LOG);
        return data ? JSON.parse(data) : [];
    },

    // ============================================
    // MÉTODOS DE GUARDADO
    // ============================================

    saveUsers(users) {
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        this.logActivity('users_updated', { count: users.length });
        this.notifyUpdate('users');
    },

    savePlaces(places) {
        localStorage.setItem(this.KEYS.PLACES, JSON.stringify(places));
        this.logActivity('places_updated', { count: places.length });
        this.notifyUpdate('places');
    },

    saveReviews(reviews) {
        localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(reviews));
        this.logActivity('reviews_updated', { count: reviews.length });
        this.notifyUpdate('reviews');
    },

    saveRewards(rewards) {
        localStorage.setItem(this.KEYS.REWARDS, JSON.stringify(rewards));
        this.logActivity('rewards_updated', { count: rewards.length });
        this.notifyUpdate('rewards');
    },

    saveRedemptions(redemptions) {
        localStorage.setItem(this.KEYS.REDEMPTIONS, JSON.stringify(redemptions));
        this.notifyUpdate('redemptions');
    },

    // ============================================
    // OPERACIONES CRUD
    // ============================================

    // Usuarios
    addUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: Date.now(),
            ...userData,
            joined: new Date().toISOString().split('T')[0],
            lastActive: new Date().toISOString().split('T')[0],
            favorites: [],
            reviews: 0,
            verified: false
        };
        users.unshift(newUser);
        this.saveUsers(users);
        return newUser;
    },

    updateUser(id, updates) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            this.saveUsers(users);
            return users[index];
        }
        return null;
    },

    deleteUser(id) {
        const users = this.getUsers().filter(u => u.id !== id);
        this.saveUsers(users);
        return true;
    },

    // Locales
    addPlace(placeData) {
        const places = this.getPlaces();
        const newPlace = {
            id: Date.now(),
            ...placeData,
            rating: 0,
            reviews: 0,
            views: 0,
            joined: new Date().toISOString().split('T')[0]
        };
        places.unshift(newPlace);
        this.savePlaces(places);
        return newPlace;
    },

    updatePlace(id, updates) {
        const places = this.getPlaces();
        const index = places.findIndex(p => p.id === id);
        if (index !== -1) {
            places[index] = { ...places[index], ...updates };
            this.savePlaces(places);
            return places[index];
        }
        return null;
    },

    deletePlace(id) {
        const places = this.getPlaces().filter(p => p.id !== id);
        const reviews = this.getReviews().filter(r => r.placeId !== id);
        this.savePlaces(places);
        this.saveReviews(reviews);
        return true;
    },

    // Reseñas
    addReview(reviewData) {
        const reviews = this.getReviews();
        const newReview = {
            id: Date.now(),
            ...reviewData,
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            likes: 0
        };
        reviews.unshift(newReview);
        this.saveReviews(reviews);
        
        // Actualizar contador de reseñas del usuario
        this.updateUser(reviewData.userId, { 
            reviews: this.getReviews().filter(r => r.userId === reviewData.userId).length 
        });
        
        return newReview;
    },

    updateReviewStatus(id, status, reason = null) {
        const reviews = this.getReviews();
        const index = reviews.findIndex(r => r.id === id);
        if (index !== -1) {
            reviews[index].status = status;
            if (reason) reviews[index].rejectionReason = reason;
            this.saveReviews(reviews);
            return reviews[index];
        }
        return null;
    },

    // Recompensas
    addReward(rewardData) {
        const rewards = this.getRewards();
        const newReward = {
            id: Date.now(),
            ...rewardData,
            redemptions: 0,
            active: true
        };
        rewards.push(newReward);
        this.saveRewards(rewards);
        return newReward;
    },

    updateReward(id, updates) {
        const rewards = this.getRewards();
        const index = rewards.findIndex(r => r.id === id);
        if (index !== -1) {
            rewards[index] = { ...rewards[index], ...updates };
            this.saveRewards(rewards);
            return rewards[index];
        }
        return null;
    },

    // Canjes
    addRedemption(userId, rewardId) {
        const rewards = this.getRewards();
        const reward = rewards.find(r => r.id === rewardId);
        
        if (!reward || reward.quantity === 0) return null;
        
        const redemptions = this.getRedemptions();
        const newRedemption = {
            id: Date.now(),
            userId,
            rewardId,
            points: reward.pointsCost,
            date: new Date().toISOString().split('T')[0],
            status: 'pending'
        };
        
        redemptions.unshift(newRedemption);
        this.saveRedemptions(redemptions);
        
        // Actualizar contador de canjes de la recompensa
        reward.redemptions++;
        if (reward.quantity > 0) reward.quantity--;
        this.saveRewards(rewards);
        
        // Restar puntos al usuario
        const user = this.getUsers().find(u => u.id === userId);
        if (user) {
            user.points -= reward.pointsCost;
            this.saveUsers(this.getUsers());
        }
        
        return newRedemption;
    },

    // ============================================
    // SISTEMA DE ACTIVIDAD Y SINCRONIZACIÓN
    // ============================================

    logActivity(type, data) {
        const activities = this.getActivityLog();
        activities.unshift({
            id: Date.now(),
            type,
            data,
            timestamp: new Date().toISOString(),
            user: this.getCurrentUser()?.email || 'system'
        });
        // Mantener solo las últimas 100 actividades
        if (activities.length > 100) activities.pop();
        localStorage.setItem(this.KEYS.ACTIVITY_LOG, JSON.stringify(activities));
    },

    getRecentActivity(limit = 10) {
        return this.getActivityLog().slice(0, limit);
    },

    notifyUpdate(entity) {
        // Guardar timestamp de última actualización
        localStorage.setItem(this.KEYS.LAST_SYNC, Date.now().toString());
        
        // Disparar evento personalizado para que otras pestañas se enteren
        window.dispatchEvent(new CustomEvent('sabormap_update', { 
            detail: { entity, timestamp: Date.now() } 
        }));
    },

    // ============================================
    // USUARIO ACTUAL (SESION)
    // ============================================

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.KEYS.CURRENT_USER);
        }
    },

    getCurrentUser() {
        const data = localStorage.getItem(this.KEYS.CURRENT_USER);
        return data ? JSON.parse(data) : null;
    },

    // ============================================
    // ESTADÍSTICAS PARA DASHBOARD
    // ============================================

    getStats() {
        const users = this.getUsers();
        const places = this.getPlaces();
        const reviews = this.getReviews();
        const rewards = this.getRewards();
        const redemptions = this.getRedemptions();

        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        return {
            users: {
                total: users.length,
                active: users.filter(u => u.status === 'active').length,
                newThisWeek: users.filter(u => new Date(u.joined) >= weekAgo).length,
                withPoints: users.filter(u => u.points > 0).length,
                byRole: {
                    user: users.filter(u => u.role === 'user').length,
                    critic: users.filter(u => u.role === 'critic').length,
                    owner: users.filter(u => u.role === 'owner').length,
                    admin: users.filter(u => u.role === 'admin').length
                }
            },
            places: {
                total: places.length,
                active: places.filter(p => p.status === 'active').length,
                pending: places.filter(p => p.status === 'pending').length,
                byCategory: places.reduce((acc, p) => {
                    acc[p.category] = (acc[p.category] || 0) + 1;
                    return acc;
                }, {})
            },
            reviews: {
                total: reviews.length,
                pending: reviews.filter(r => r.status === 'pending').length,
                approved: reviews.filter(r => r.status === 'approved').length,
                rejected: reviews.filter(r => r.status === 'rejected').length,
                averageRating: reviews.length > 0 
                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                    : 0
            },
            rewards: {
                total: rewards.length,
                active: rewards.filter(r => r.active).length,
                totalRedemptions: redemptions.length,
                pointsDistributed: users.reduce((sum, u) => sum + u.points, 0)
            }
        };
    },

    // ============================================
    // RESET Y UTILIDADES
    // ============================================

    resetAllData() {
        if (confirm('¿Estás seguro de resetear TODOS los datos? Esta acción no se puede deshacer.')) {
            Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
            location.reload();
        }
    },

    exportData() {
        const data = {
            users: this.getUsers(),
            places: this.getPlaces(),
            reviews: this.getReviews(),
            rewards: this.getRewards(),
            redemptions: this.getRedemptions(),
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sabormap_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.users) this.saveUsers(data.users);
            if (data.places) this.savePlaces(data.places);
            if (data.reviews) this.saveReviews(data.reviews);
            if (data.rewards) this.saveRewards(data.rewards);
            if (data.redemptions) this.saveRedemptions(data.redemptions);
            return true;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    }
};

// Hacer disponible globalmente
window.SaborMapStorage = SaborMapStorage;

// Escuchar cambios en otras pestañas
window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('sabormap_')) {
        window.dispatchEvent(new CustomEvent('sabormap_data_changed', { 
            detail: { key: e.key, newValue: e.newValue } 
        }));
    }
});