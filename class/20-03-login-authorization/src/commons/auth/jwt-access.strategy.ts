import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   jwtFromRequest: (req) => {
      //     const accessToken = req.headers.Authorization; // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15bmFtZUBpcy7ssqDsiJgiLCJzdWIiOiIwYjUxM2EzOC0wODk1LTQ5MWUtYWNhNC1iMWViZGQ4MWVmOTIiLCJpYXQiOjE2NTkwODE0MTAsImV4cCI6MTY1OTA4NTAxMH0.JrZVR1otViyvVPOxB_9HldW4P9rifP8SN1KB6UtdRyE"
      //     const result = accessToken.replace('Bearer ', '');
      //     return result;
      //   },
      secretOrKey: 'myAccessKey',
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
