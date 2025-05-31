package SE4487.project.FoodOrderingSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import SE4487.project.FoodOrderingSystem.model.SystemUser;
import SE4487.project.FoodOrderingSystem.service.UserService;

@Controller
@RequestMapping("/auth")
public class AuthorizationController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody SystemUser user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(user));
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody SystemUser user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.verify(user));
	}
}
