package com.bakadestroyer.simplesocialnetwork.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.models.User;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);

        if(header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        Authentication authentication = getEmailPasswordAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(request, response);
    }

    private Authentication getEmailPasswordAuthentication(HttpServletRequest request) {
        String token = request.getHeader(JwtProperties.HEADER_STRING);
        if (token != null) {
            String email  = JWT.require(Algorithm.HMAC256(JwtProperties.SECRET.getBytes()))
                    .build()
                    .verify(token.replace(JwtProperties.TOKEN_PREFIX, ""))
                    .getSubject();

            if(email != null) {
                User user = userRepository.findByEmail(email);
                UserPrincipal userPrincipal = new UserPrincipal(user);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
                return authenticationToken;
            }
            return null;
        }
        return null;
    }
}
