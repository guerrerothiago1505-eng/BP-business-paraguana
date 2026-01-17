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
        scaffoldBackgroundColor: const Color(0xFFF5F5DC),
        primaryColor: const Color(0xFFBE1E2D),
      ),
      home: const MainRouter(),
    );
  }
}

class MainRouter extends StatefulWidget {
  const MainRouter({super.key});

  @override
  State<MainRouter> createState() => _MainRouterState();
}

class _MainRouterState extends State<MainRouter> {
  String currentView = 'welcome';

  void navigate(String view) {
    setState(() {
      currentView = view;
    });
  }

  // --- FUNCIÓN NAVITEM CORREGIDA ---
  Widget _navItem(IconData icon, IconData activeIcon, String label, String view) {
    bool isActive = currentView == view;
    return GestureDetector(
      onTap: () => navigate(view),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(isActive ? activeIcon : icon, 
              color: isActive ? const Color(0xFFBE1E2D) : Colors.grey),
          const SizedBox(height: 4),
          Text(label, 
              style: TextStyle(
                  fontSize: 8, 
                  fontWeight: FontWeight.w900, 
                  color: isActive ? const Color(0xFFBE1E2D) : Colors.grey)),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
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
      case 'profile':
        body = ProfileView(onLogout: () => navigate('welcome'));
        break;
      default:
        body = const HomeView();
    }

    return Scaffold(
      body: body,
      bottomNavigationBar: showNavbar ? Container(
        height: 80,
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: Colors.grey.shade200)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _navItem(Icons.home_outlined, Icons.home, 'PRINCIPAL', 'home'),
            _navItem(Icons.assignment_outlined, Icons.assignment, 'MI GESTIÓN', 'requests'),
            _navItem(Icons.chat_bubble_outline, Icons.chat_bubble, 'ASESOR BP', 'chat'),
            _navItem(Icons.person_outline, Icons.person, 'PERFIL', 'profile'),
          ],
        ),
      ) : null,
    );
  }
}

class WelcomeView extends StatelessWidget {
  final VoidCallback onStart;
  const WelcomeView({super.key, required this.onStart});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // LOGO CON SOPORTE PARA ARCHIVO
          Image.asset(
            'assets/logo.png',
            height: 150,
            errorBuilder: (context, error, stackTrace) => 
              const Icon(Icons.business_center, size: 120, color: Color(0xFF1E293B)),
          ),
          const SizedBox(height: 30),
          const Text('BUSINESS PARAGUANÁ', 
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, letterSpacing: 2)),
          const SizedBox(height: 50),
          ElevatedButton(
            onPressed: onStart,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFBE1E2D),
              padding: const EdgeInsets.symmetric(horizontal: 60, vertical: 15),
            ),
            child: const Text('INGRESAR AL SISTEMA', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}

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
        children: [
          const Text('INICIAR SESIÓN', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
          const SizedBox(height: 40),
          const TextField(decoration: InputDecoration(labelText: 'CORREO', border: OutlineInputBorder())),
          const SizedBox(height: 20),
          const TextField(obscureText: true, decoration: InputDecoration(labelText: 'CLAVE', border: OutlineInputBorder())),
          const SizedBox(height: 30),
          ElevatedButton(onPressed: onLogin, child: const Text('ENTRAR')),
          TextButton(onPressed: onBack, child: const Text('VOLVER')),
        ],
      ),
    );
  }
}

class HomeView extends StatelessWidget {
  const HomeView({super.key});
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("BIENVENIDO AL HOME"));
  }
}

class ProfileView extends StatelessWidget {
  final VoidCallback onLogout;
  const ProfileView({super.key, required this.onLogout});
  @override
  Widget build(BuildContext context) {
    return Center(child: ElevatedButton(onPressed: onLogout, child: const Text("SALIR")));
  }
}
