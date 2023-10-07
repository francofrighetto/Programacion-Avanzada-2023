package progAvan.Service;

import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import progAvan.Enum.Role;
import progAvan.Jwt.JwtService;
import progAvan.Model.User;
import progAvan.Repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public String login(User usuario) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword()));
        UserDetails user=userRepository.findByUsername(usuario.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return token;

    }

    public String register(User request) {
        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode( request.getPassword()));
        user.setLastname(request.getLastname());
        user.setCountry(request.getCountry());


        userRepository.save(user);

        return jwtService.getToken(user);
        
    }

}

