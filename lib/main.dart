import 'package:flutter/material.dart';

void main() {
  runApp(const BusinessParaguanaApp());
}

class BusinessParaguanaApp extends StatelessWidget {
  const BusinessParaguanaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Business Paraguaná',
      theme: ThemeData(
        // Definimos los colores de tu marca basados en tu código React
        scaffoldBackgroundColor: const Color(0xFFF5F5DC), // brand-beige
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E293B), // brand-slate
          primary: const Color(0xFFBE1E2D),   // brand-red
        ),
        fontFamily: 'sans-serif',
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
  int _selectedIndex = 0;

  // Lista de vistas (equivalente a tu switch(currentView))
  final List<Widget> _views = [
    const Center(child: Text('HOME - BUSINESS PARAGUANÁ')),
    const Center(child: Text('MI GESTIÓN')),
    const Center(child: Text('ASESOR BP')),
    const Center(child: Text('PERFIL')),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BP', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: _views[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFFBE1E2D),
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'PRINCIPAL'),
          BottomNavigationBarItem(icon: Icon(Icons.list_alt), label: 'GESTIÓN'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble), label: 'ASESOR'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'PERFIL'),
        ],
      ),
    );
  }
}
