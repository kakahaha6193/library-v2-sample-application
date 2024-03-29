package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Sach;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Sach entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SachRepository extends JpaRepository<Sach, Long> {}
