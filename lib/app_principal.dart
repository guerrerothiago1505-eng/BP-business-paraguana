import 'package:flutter/material.dart';

void main() => runApp(const BusinessParaguanaApp());

class BusinessParaguanaApp extends StatelessWidget {
  const BusinessParaguanaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Business Paraguaná',
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFFF5F5DC), // brand-beige
        primaryColor: const Color(0xFFBE1E2D),           // brand-red
        fontFamily: 'sans-serif',
      ),
      home: const MainRouter(),
    );
  }
}

// --- ROUTER PRINCIPAL (Equivalente a tu renderView) ---
class MainRouter extends StatefulWidget {
  const MainRouter({super.key});

  @override
  State<MainRouter> createState() => _MainRouterState();
}

class _MainRouterState extends State<MainRouter> {
  String currentView = 'welcome';
  int _selectedIndex = 0;

  // Función para cambiar de vista (Navegación)
  void navigate(String view) {
    setState(() {
      currentView = view;
    });
  }

  @override
  Widget build(BuildContext context) {
    // Si estamos en pantallas iniciales, no mostramos el Navbar
    bool showNavbar = ['home', 'requests', 'chat', 'profile'].contains(currentView);

    Widget body;
    switch (currentView) {
      case 'welcome':
        body = WelcomeView(onStart: () => navigate('login'));
        break;
      case 'login':
        body = LoginView(onLogin: () => navigate('home'), onBack: () => navigate('welcome'));
        break;
      case 'home':
        body = const HomeView();
        break;
      case 'requests':
        body = const Center(child: Text('MI GESTIÓN (Próximamente)', style: TextStyle(fontWeight: FontWeight.bold)));
        break;
      case 'chat':
        body = const Center(child: Text('ASESOR BP (WhatsApp Integration)', style: TextStyle(fontWeight: FontWeight.bold)));
        break;
      case 'profile':
        body = ProfileView(onLogout: () => navigate('welcome'));
        break;
      default:
        body = const HomeView();
    }

    return Scaffold(
      body: Stack(
        children: [
          body,
          // Notificación de Email (Toast) - Aparece arriba como en tu código
          Positioned(
            top: 50,
            right: 20,
            child: Container(), // Aquí iría el widget de notificación si hay un evento
          ),
        ],
      ),
      bottomNavigationBar: showNavbar ? _buildNavbar() : null,
    );
  }

  Widget _buildNavbar() {
    return Container(
      height: 80,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Colors.grey.shade200)),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, -5))],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _navItem(0, Icons.home_outlined, Icons.home, 'PRINCIPAL', 'home'),
          _navItem(1, Icons.assignment_outlined, Icons.assignment, 'MI GESTIÓN', 'requests'),
          _navItem(2, Icons.chat_bubble_outline, Icons.chat_bubble, 'ASESOR BP', 'chat'),
          _navItem(3, Icons.person_outline, Icons.person, 'PERFIL', 'profile'),
        ],
      ),
    );
  }

  Widget _navItem(int index, IconData icon, IconData activeIcon, String label, String view) {
    bool isActive = currentView == view;
    return GestureDetector(
      onTap: () => navigate(view),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(isActive ? activeIcon : icon, color: isActive ? const Color(0xFFBE1E2D) : Colors.slateGrey),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(fontSize: 8, fontWeight: FontWeight.black, color: isActive ? const Color(0xFFBE1E2D) : Colors.slateGrey)),
        ],
      ),
    );
  }
}

// --- VISTA: BIENVENIDA ---
class WelcomeView extends StatelessWidget {
  final VoidCallback onStart;
  const WelcomeView({super.key, required this.onStart});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // ESTE ES EL NUEVO CÓDIGO PARA EL LOGO:
          Image.asset(
            'assets/logo.png', 
            height: 150, 
            errorBuilder: (context, error, stackTrace) {
              // Si la imagen no carga, muestra el maletín azul para que no se vea vacío
              return const Icon(Icons.business_center, size: 120, color: Color(0xFF1E293B));
            },
          ),
          const SizedBox(height: 30),
          const Text('BUSINESS PARAGUANÁ', 
            style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: 2)),
          // ... resto del código
          
          const Icon(Icons.business_center, size: 120, color: Color(0xFF1E293B)),
          const SizedBox(height: 30),
          const Text('BUSINESS PARAGUANÁ', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: 2)),
          const SizedBox(height: 50),
          ElevatedButton(
            onPressed: onStart,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFBE1E2D),
              padding: const EdgeInsets.symmetric(horizontal: 80, vertical: 15),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('INGRESAR AL SISTEMA', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}

// --- VISTA: LOGIN ---
class LoginView extends StatelessWidget {
  final VoidCallback onLogin;
  final VoidCallback onBack;
  const LoginView({super.key, required this.onLogin, required this.onBack});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(30.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back_ios)),
          const SizedBox(height: 20),
          const Text('INICIAR SESIÓN', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
          const Text('Sincronizando con la Nube BP', style: TextStyle(fontSize: 10, color: Colors.grey)),
          const SizedBox(height: 40),
          const TextField(decoration: InputDecoration(labelText: 'CORREO ELECTRÓNICO', border: OutlineInputBorder())),
          const SizedBox(height: 20),
          const TextField(obscureText: true, decoration: InputDecoration(labelText: 'CONTRASEÑA', border: OutlineInputBorder())),
          const SizedBox(height: 30),
          SizedBox(
            width: double.infinity,
            height: 55,
            child: ElevatedButton(
              onPressed: onLogin,
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFBE1E2D)),
              child: const Text('ENTRAR', style: TextStyle(color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}

// --- VISTA: HOME (Categorías) ---
class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        const SliverAppBar(
          backgroundColor: Color(0xFF1E293B),
          title: Text('BUSINESS PARAGUANÁ', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          floating: true,
        ),
        SliverPadding(
          padding: const EdgeInsets.all(20),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              const Text('¿Qué buscas hoy?', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(height: 20),
              _card(Icons.home_work, 'INMUEBLES', 'Compra, venta y alquiler', Colors.blueGrey),
              _card(Icons.directions_car, 'VEHÍCULOS', 'Nuevos y usados', Colors.redAccent),
              _card(Icons.handyman, 'SERVICIOS', 'Profesionales a tu alcance', Colors.orange),
              _card(Icons.business_center, 'NEGOCIOS', 'Oportunidades BP', Colors.indigo),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _card(IconData icon, String title, String sub, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 15),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
      ),
      child: Row(
        children: [
          CircleAvatar(backgroundColor: color.withOpacity(0.1), radius: 30, child: Icon(icon, color: color, size: 30)),
          const SizedBox(width: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              Text(sub, style: const TextStyle(color: Colors.grey, fontSize: 12)),
            ],
          ),
          const Spacer(),
          const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
        ],
      ),
    );
  }
}

// --- VISTA: PERFIL ---
class ProfileView extends StatelessWidget {
  final VoidCallback onLogout;
  const ProfileView({super.key, required this.onLogout});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircleAvatar(radius: 50, backgroundColor: Colors.grey, child: Icon(Icons.person, size: 50, color: Colors.white)),
          const SizedBox(height: 20),
          const Text('Aliado Business Paraguaná', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 40),
          TextButton.icon(onPressed: onLogout, icon: const Icon(Icons.logout, color: Colors.red), label: const Text('CERRAR SESIÓN', style: TextStyle(color: Colors.red))),
        ],
      ),
    );
  }
}
