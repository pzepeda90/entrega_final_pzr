import { ROLES } from '../constants/roles';

export const mockUsers = [
  {
    id: 1,
    nombre: 'Administrador',
    apellido: 'Principal',
    email: 'admin@lbandito.com',
    password: 'admin123',
    telefono: '123456789',
    fecha_nacimiento: '1980-01-01',
    role: ROLES.ADMIN,
    fecha_registro: '2023-01-01T10:00:00Z',
    activo: true,
    created_at: '2023-01-01T10:00:00Z',
    updated_at: '2023-06-01T10:00:00Z',
    avatar: 'https://ui-avatars.com/api/?name=Administrador+Principal&background=6366f1&color=fff',
    direcciones: [
      {
        direccion_id: 1,
        alias: 'Casa',
        calle: 'Calle Falsa',
        numero: '123',
        departamento: 'A',
        ciudad: 'Santiago',
        comuna: 'Centro',
        codigo_postal: '12345',
        pais: 'Chile',
        principal: true,
        created_at: '2023-01-01T10:00:00Z',
        updated_at: '2023-06-01T10:00:00Z',
      },
      {
        direccion_id: 3,
        alias: 'Oficina',
        calle: 'Av. Ejemplo',
        numero: '456',
        departamento: '1202',
        ciudad: 'Santiago',
        comuna: 'Las Condes',
        codigo_postal: '67890',
        pais: 'Chile',
        principal: false,
        created_at: '2023-01-01T10:00:00Z',
        updated_at: '2023-06-01T10:00:00Z',
      }
    ]
  },
  {
    id: 2,
    nombre: 'Juan',
    apellido: 'Vendedor',
    email: 'vendedor@lbandito.com',
    password: 'vendedor123',
    telefono: '987654321',
    role: ROLES.VENDEDOR,
    fecha_contratacion: '2023-02-01T10:00:00Z',
    activo: true,
    created_at: '2023-02-01T10:00:00Z',
    updated_at: '2023-06-01T10:00:00Z',
    avatar: 'https://ui-avatars.com/api/?name=Juan+Vendedor&background=22c55e&color=fff',
    // Sin direcciones
  },
  {
    id: 3,
    nombre: 'María',
    apellido: 'Cliente',
    email: 'cliente@lbandito.com',
    password: 'cliente123',
    telefono: '555555555',
    fecha_nacimiento: '1995-05-05',
    role: ROLES.CLIENTE,
    fecha_registro: '2023-03-01T10:00:00Z',
    activo: true,
    created_at: '2023-03-01T10:00:00Z',
    updated_at: '2023-06-01T10:00:00Z',
    avatar: 'https://ui-avatars.com/api/?name=María+Cliente&background=f59e0b&color=fff',
    direcciones: [
      {
        direccion_id: 2,
        alias: 'Casa',
        calle: 'Av. Siempre Viva',
        numero: '742',
        ciudad: 'Providencia',
        comuna: 'Providencia',
        codigo_postal: '54321',
        pais: 'Chile',
        principal: true,
        created_at: '2023-03-01T10:00:00Z',
        updated_at: '2023-06-01T10:00:00Z',
      }
    ]
  }
];

export const mockAuthService = {
  login: async (email, password) => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token mock
    const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));

    return {
      user: {
        ...user,
        password: undefined, // No exponer password
      },
      token,
    };
  },
}; 