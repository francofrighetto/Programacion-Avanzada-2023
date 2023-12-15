package progAvan.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import progAvan.Model.User;
import progAvan.Service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200" }, maxAge = 3600)
public class AuthController {
    
    private final AuthService authService;

    @Autowired
    AuthenticationManager authenticationManager;

    Map<String, String> response = new HashMap<>();

    
    @PostMapping(value = "login")
    public ResponseEntity<String> login(@RequestBody User usuario)
    {
        return ResponseEntity.ok(authService.login(usuario));
    }

    @PostMapping(value = "register")
    public ResponseEntity<String> register(@RequestBody User usuario)
    {
        return ResponseEntity.ok(authService.register(usuario));
    }

    @PostMapping("/current")
    public ResponseEntity getCurrentUser(@RequestBody User usuario) {
        Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuario.getUsername(),usuario.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        if (authentication != null && authentication.isAuthenticated()) {
            this.response.put("message", "El usuario ha iniciado sesión como: " + authentication.getName());
            return new ResponseEntity<>(this.response, HttpStatus.OK);
        } else {
            this.response.put("message", "El usuario no ha iniciado sesión");
            return new ResponseEntity<>(this.response, HttpStatus.OK);        }
    }
}
