package com.api.api.user;

import java.util.Set;

public enum Role {
    ADMIN(Set.of()),
    VENDORS(Set.of("Vendor Service")),
    RESIDENTS(Set.of()),
    HAWKERS(Set.of("Hawker Service")),
    SERVICE_PROVIDERS(Set.of("Service Provider Service"));

    private final Set<String> services;

    Role() {
        // Default constructor for roles without specific services
        this.services = Set.of();
    }

    Role(Set<String> services) {
        // Constructor for roles with specific services
        this.services = services;
    }

    public Set<String> getServices() {
        return services;
    }
}
