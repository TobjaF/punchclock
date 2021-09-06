package ch.zli.m223.punchclock.repository;

import ch.zli.m223.punchclock.domain.Rapport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RapportRepository extends JpaRepository<Rapport, Long> {
}
