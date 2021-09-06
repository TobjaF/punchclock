package ch.zli.m223.punchclock.service;

import ch.zli.m223.punchclock.domain.Project;
import ch.zli.m223.punchclock.domain.Rapport;
import ch.zli.m223.punchclock.repository.RapportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RapportService {
    private RapportRepository rapportRepository;

    public RapportService(RapportRepository rapportRepository) {
        this.rapportRepository = rapportRepository;
    }

    public Rapport createRapport(Rapport rapport) {
        return rapportRepository.saveAndFlush(rapport);
    }

    public List<Rapport> findAll() {
        return rapportRepository.findAll();
    }

    public void deleteRapport(long id) { rapportRepository.deleteById(id); }

    public Rapport updateRapport(Rapport rapport) {
        return rapportRepository.save(rapport);
    }

}
