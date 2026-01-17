
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:animations/animations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark,
  ));
  runApp(const BusinessParaguanaApp());
}

class BPColors {
  static const Color red = Color(0xFFA11B20);
  static const Color redDark = Color(0xFF7A0F12);
  static const Color gold = Color(0xFFC5A059);
  static const Color slate = Color(0xFF121212);
  static const Color beige = Color(0xFFE8E2D9);
  
  static const LinearGradient redGradient = LinearGradient(
    colors: [red, redDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class BusinessParaguanaApp extends StatelessWidget {
  const BusinessParaguanaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Business Paraguaná',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: BPColors.beige,
        textTheme: GoogleFonts.interTextTheme(),
      ),
      home: const MainNavigation(),
    );
  }
}

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});
  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;
  final List<Widget> _pages = [
    const FlutterHomeScreen(),
    const Center(child: Text('Mercado')),
    const Center(child: Text('Asesor')),
    const Center(child: Text('Perfil')),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageTransitionSwitcher(
        transitionBuilder: (child, animation, secondaryAnimation) => SharedAxisTransition(
          animation: animation,
          secondaryAnimation: secondaryAnimation,
          transitionType: SharedAxisTransitionType.horizontal,
          child: child,
        ),
        child: _pages[_currentIndex],
      ),
      bottomNavigationBar: Container(
        height: 100,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(40)),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 30)],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _navItem(0, Icons.home_filled, 'INICIO'),
            _navItem(1, Icons.business_center, 'NEGOCIOS'),
            _navItem(2, Icons.chat_bubble, 'ASESOR'),
            _navItem(3, Icons.person, 'PERFIL'),
          ],
        ),
      ),
    );
  }

  Widget _navItem(int index, IconData icon, String label) {
    bool active = _currentIndex == index;
    return GestureDetector(
      onTap: () => setState(() => _currentIndex = index),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: active ? BPColors.red : Colors.grey[400]),
          Text(label, style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: active ? BPColors.red : Colors.grey[400])),
        ],
      ),
    );
  }
}

class FlutterHomeScreen extends StatelessWidget {
  const FlutterHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(24, 60, 24, 100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('HOLA, ALIADO', style: GoogleFonts.playfairDisplay(fontSize: 24, fontWeight: FontWeight.bold)),
                  const Text('MEMBRESÍA VIP ACTIVA', style: TextStyle(color: BPColors.red, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 2)),
                ],
              ),
              const Icon(Icons.notifications_none, size: 30),
            ],
          ),
          const SizedBox(height: 30),
          _buildHeroCard(),
          const SizedBox(height: 30),
          const Text('SERVICIOS EJECUTIVOS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
          const SizedBox(height: 15),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 20,
            crossAxisSpacing: 20,
            children: [
              _buildServiceCard('INMUEBLES', Icons.home_work),
              _buildServiceCard('VEHÍCULOS', Icons.directions_car),
              _buildServiceCard('LEGAL', Icons.gavel),
              _buildServiceCard('PAGOS', Icons.payments),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildHeroCard() {
    return Container(
      height: 200,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(40),
        gradient: BPColors.redGradient,
        boxShadow: [BoxShadow(color: BPColors.red.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))],
      ),
      padding: const EdgeInsets.all(30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Text('MERCADO VIRTUAL', style: GoogleFonts.playfairDisplay(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
          const Text('ACTIVOS DE ALTO VALOR', style: TextStyle(color: Colors.white70, fontSize: 10, letterSpacing: 2)),
        ],
      ),
    );
  }

  Widget _buildServiceCard(String title, IconData icon) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(30)),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: BPColors.red, size: 40),
          const SizedBox(height: 10),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
        ],
      ),
    );
  }
}
// --- ESTE ES TU LOGO CONVERTIDO A FLUTTER (Añádelo al final del archivo) ---
class BPLogo extends StatelessWidget {
  final double size;
  const BPLogo({super.key, this.size = 150});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Anillo de brújula sutil
          Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFFF1E0B0).withOpacity(0.3), width: 1),
            ),
          ),
          // El emblema se puede representar con CustomPaint o cargando el SVG
          // Para esta versión, usaremos tu imagen logo.png como respaldo 
          // O podemos dibujar el emblema. 
          Image.asset('assets/logo.png', fit: BoxFit.contain),
        ],
      ),
    );
  }
}

// --- ACTUALIZACIÓN DE LA PANTALLA DE INICIO ---
class FlutterHomeScreen extends StatelessWidget {
  const FlutterHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(24, 60, 24, 100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Aquí ahora invocamos tu identidad visual
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('BUSINESS', style: TextStyle(fontFamily: 'Playfair Display', fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: 2)),
                  Text('PARAGUANÁ', style: TextStyle(color: Color(0xFFA11B20), fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: 2)),
                ],
              ),
              const Icon(Icons.notifications_none, size: 30),
            ],
          ),
          const SizedBox(height: 30),
          _buildHeroCard(),
          const SizedBox(height: 30),
          const Text('SERVICIOS EJECUTIVOS', 
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 2)),
          const SizedBox(height: 15),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 20,
            crossAxisSpacing: 20,
            children: [
              _buildServiceCard('INMUEBLES', Icons.home_work, "BIENES RAÍCES"),
              _buildServiceCard('VEHÍCULOS', Icons.directions_car, "AUTOMOTRIZ"),
              _buildServiceCard('LEGAL', Icons.gavel, "CONSULTORÍA"),
              _buildServiceCard('PAGOS', Icons.payments, "FINANZAS"),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildHeroCard() {
    return Container(
      height: 220,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        gradient: const LinearGradient(
          colors: [Color(0xFFA11B20), Color(0xFF7A0F12)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(color: const Color(0xFFA11B20).withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))
        ],
      ),
      child: Stack(
        children: [
          Positioned(
            right: -20,
            bottom: -20,
            child: Icon(Icons.business_center, size: 200, color: Colors.white.withOpacity(0.05)),
          ),
          Padding(
            padding: const EdgeInsets.all(30),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                const Text('MERCADO VIRTUAL', style: TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.bold)),
                Text('ACTIVOS DE ALTO VALOR', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 10, letterSpacing: 4)),
                const SizedBox(height: 15),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
                  decoration: BoxDecoration(color: const Color(0xFFC5A059), borderRadius: BorderRadius.circular(10)),
                  child: const Text('EXPLORAR', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceCard(String title, IconData icon, String subtitle) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white, 
        borderRadius: BorderRadius.circular(25),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10)]
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: const Color(0xFFA11B20), size: 35),
          const SizedBox(height: 12),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14)),
          Text(subtitle, style: const TextStyle(color: Color(0xFFC5A059), fontSize: 8, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
