import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:animations/animations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark,
  ));
  runApp(const BusinessParaguanaApp());
}

// --- COLORES PREMIUM ---
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
      home: const WelcomeScreen(),
    );
  }
}

// --- PANTALLA DE BIENVENIDA ---
class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 30),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const BPLogo(size: 200), // AQUÍ ESTÁ EL LOGO DE LA IA
            const SizedBox(height: 40),
            Text('BIENVENIDO A', 
              style: GoogleFonts.montserrat(letterSpacing: 4, fontSize: 10, fontWeight: FontWeight.w900, color: Colors.grey[500])),
            Text('BUSINESS', style: GoogleFonts.playfairDisplay(fontSize: 42, fontWeight: FontWeight.w900, letterSpacing: 2)),
            Text('PARAGUANÁ', style: GoogleFonts.playfairDisplay(fontSize: 42, fontWeight: FontWeight.w900, color: BPColors.red, letterSpacing: 2)),
            const SizedBox(height: 60),
            _authButton(context, "YA SOY USUARIO", Colors.white, BPColors.slate, () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const MainNavigation()));
            }),
            const SizedBox(height: 20),
            _authButton(context, "REGISTRARME", BPColors.red, Colors.white, () {
              mostrarContratoLegal(context);
            }),
          ],
        ),
      ),
    );
  }

  Widget _authButton(BuildContext context, String text, Color bg, Color textCol, VoidCallback action) {
    return SizedBox(
      width: double.infinity,
      height: 65,
      child: ElevatedButton(
        onPressed: action,
        style: ElevatedButton.styleFrom(
          backgroundColor: bg,
          foregroundColor: textCol,
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        ),
        child: Text(text, style: const TextStyle(fontWeight: FontWeight.w900, letterSpacing: 2)),
      ),
    );
  }
}

// --- EL LOGO DE LA IA (SVG TRADUCIDO A FLUTTER) ---
class BPLogo extends StatelessWidget {
  final double size;
  const BPLogo({super.key, this.size = 150});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: LogoPainter(),
      ),
    );
  }
}

class LogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final double w = size.width;
    final double h = size.height;
    final double scale = w / 500;

    final crimsonPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFFC41E24), Color(0xFF7A0F12)],
      ).createShader(Rect.fromLTWH(0, 0, w, h));

    final goldPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFFEAD2A0), Color(0xFFC5A059), Color(0xFF8F7135)],
      ).createShader(Rect.fromLTWH(0, 0, w, h));

    // Ala Izquierda
    var pathLeft = Path();
    pathLeft.moveTo(250 * scale, 40 * scale);
    pathLeft.lineTo(80 * scale, 340 * scale);
    pathLeft.lineTo(160 * scale, 340 * scale);
    pathLeft.lineTo(250 * scale, 160 * scale);
    pathLeft.close();
    canvas.drawPath(pathLeft, crimsonPaint);

    // Ala Derecha
    var pathRight = Path();
    pathRight.moveTo(250 * scale, 40 * scale);
    pathRight.lineTo(420 * scale, 340 * scale);
    pathRight.lineTo(340 * scale, 340 * scale);
    pathRight.lineTo(250 * scale, 160 * scale);
    pathRight.close();
    canvas.drawPath(pathRight, goldPaint);
    
    // Core Central
    final whitePaint = Paint()..color = Colors.white.withOpacity(0.9);
    var pathCore = Path();
    pathCore.moveTo(250 * scale, 160 * scale);
    pathCore.lineTo(320 * scale, 300 * scale);
    pathCore.lineTo(180 * scale, 300 * scale);
    pathCore.close();
    canvas.drawPath(pathCore, whitePaint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

// --- NAVEGACIÓN Y HOME ---
class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});
  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;
  final List<Widget> _pages = [
    const FlutterHomeScreen(),
    const Center(child: Text('Mercado de Activos')),
    const Center(child: Text('Chat con Asesor')),
    const Center(child: Text('Perfil de Aliado')),
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
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: BPColors.red,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'INICIO'),
          BottomNavigationBarItem(icon: Icon(Icons.business_center), label: 'NEGOCIOS'),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'ASESOR'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'PERFIL'),
        ],
      ),
    );
  }
}

class FlutterHomeScreen extends StatelessWidget {
  const FlutterHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Panel de Control Business Paraguaná"));
  }
}

// --- MODAL LEGAL ---
void mostrarContratoLegal(BuildContext context) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text("Contrato de Resguardo"),
      content: const Text("Al registrarse, usted acepta las condiciones de corretaje y resguardo de activos de Business Paraguaná (Punto Fijo)."),
      actions: [
        TextButton(onPressed: () {
          Navigator.pop(context);
          Navigator.push(context, MaterialPageRoute(builder: (_) => const MainNavigation()));
        }, child: const Text("ACEPTAR"))
      ],
    ),
  );
}
