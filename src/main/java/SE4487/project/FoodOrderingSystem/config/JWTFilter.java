package SE4487.project.FoodOrderingSystem.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import SE4487.project.FoodOrderingSystem.service.auth.JWTService;
import SE4487.project.FoodOrderingSystem.service.auth.SystemUserDetails;
import SE4487.project.FoodOrderingSystem.service.auth.SystemUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter {

	@Autowired
	private JWTService jwtService;
	@Autowired
	private SystemUserDetailsService systemUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authorizationHeader = request.getHeader("Authorization");
		String token;
		String username;

		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")
				|| request.getServletPath().startsWith("/auth/")) {
			doFilter(request, response, filterChain);
			return;
		}
		token = authorizationHeader.substring(7);
		username = this.jwtService.extractUsername(token);

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			SystemUserDetails userDetails = systemUserDetailsService.loadUserByUsername(username);
			if (jwtService.isTokenValid(token, userDetails)) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}

		filterChain.doFilter(request, response);
	}

}
