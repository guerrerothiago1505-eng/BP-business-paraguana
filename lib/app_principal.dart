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
            const BPLogo(size: 200),
            const SizedBox(height: 40),
            Text('BIENVENIDO A', style: GoogleFonts.montserrat(letterSpacing: 4, fontSize: 10, fontWeight: FontWeight.w900, color: Colors.grey[500])),
            Text('BUSINESS', style: GoogleFonts.playfairDisplay(fontSize: 42, fontWeight: FontWeight.w900, letterSpacing: 2)),
            Text('PARAGUANÁ', style: GoogleFonts.playfairDisplay(fontSize: 42, fontWeight: FontWeight.w900, color: BPColors.red, letterSpacing: 2)),
            const SizedBox(height: 60),
            _btn(context, "YA SOY USUARIO", Colors.white, BPColors.slate, () => Navigator.push(context, MaterialPageRoute(builder: (_) => const MainNavigation()))),
            const SizedBox(height: 20),
            _btn(context, "REGISTRARME", BPColors.red, Colors.white, () => mostrarContrato(context)),
          ],
        ),
      ),
    );
  }

  Widget _btn(BuildContext context, String txt, Color bg, Color tc, VoidCallback fn) {
    return SizedBox(width: double.infinity, height: 65, child: ElevatedButton(onPressed: fn, style: ElevatedButton.styleFrom(backgroundColor: bg, foregroundColor: tc, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20))), child: Text(txt, style: const TextStyle(fontWeight: FontWeight.w900, letterSpacing: 2))));
  }
}

class BPLogo extends StatelessWidget {
  final double size;
  const BPLogo({super.key, this.size = 150});
  @override
  Widget build(BuildContext context) {
    return SizedBox(width: size, height: size, child: CustomPaint(painter: LogoPainter()));
  }
}

class LogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final double w = size.width;
    final double h = size.height;
    final double scale = w / 500;
    final crimson = Paint()..shader = const LinearGradient(colors: [Color(0xFFC41E24), Color(0xFF7A0F12)]).createShader(Rect.fromLTWH(0, 0, w, h));
    final gold = Paint()..shader = const LinearGradient(colors: [Color(0xFFEAD2A0), Color(0xFFC5A059), Color(0xFF8F7135)]).createShader(Rect.fromLTWH(0, 0, w, h));
    var p1 = Path()..moveTo(250*scale, 40*scale)..lineTo(80*scale, 340*scale)..lineTo(160*scale, 340*scale)..lineTo(250*scale, 160*scale)..close();
    var p2 = Path()..moveTo(250*scale, 40*scale)..lineTo(420*scale, 340*scale)..lineTo(340*scale, 340*scale)..lineTo(250*scale, 160*scale)..close();
    canvas.drawPath(p1, crimson); canvas.drawPath(p2, gold);
  }
  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});
  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _idx = 0;
  final _pages = [const Center(child: Text("INICIO")), const Center(child: Text("MERCADO")), const Center(child: Text("ASESOR")), const Center(child: Text("PERFIL"))];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_idx],
      bottomNavigationBar: BottomNavigationBar(currentIndex: _idx, onTap: (i) => setState(() => _idx = i), selectedItemColor: BPColors.red, unselectedItemColor: Colors.grey, type: BottomNavigationBarType.fixed, items: const [BottomNavigationBarItem(icon: Icon(Icons.home), label: 'INICIO'), BottomNavigationBarItem(icon: Icon(Icons.business_center), label: 'MERCADO'), BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'ASESOR'), BottomNavigationBarItem(icon: Icon(Icons.person), label: 'PERFIL')]),
    );
  }
}

void mostrarContrato(BuildContext context) {
  showDialog(context: context, builder: (c) => AlertDialog(title: const Text("Contrato de Resguardo"), content: const Text("Acepto las condiciones de corretaje de Business Paraguaná."), actions: [TextButton(onPressed: () { Navigator.pop(c); Navigator.push(context, MaterialPageRoute(builder: (_) => const MainNavigation())); }, child: const Text("ACEPTAR"))]));
}
