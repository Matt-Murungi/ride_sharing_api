import { JwtModule } from '@nestjs/jwt';

export const JwtSettings = JwtModule.register({
  secret: 'jwt_secret',
  signOptions: { expiresIn: '1d' },
});
