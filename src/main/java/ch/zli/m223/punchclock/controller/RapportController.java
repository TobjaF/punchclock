package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.Rapport;
import ch.zli.m223.punchclock.domain.Rapport;
import ch.zli.m223.punchclock.service.RapportService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/rapports")
public class RapportController {
    private RapportService rapportService;

    public RapportController(RapportService rapportService) {
        this.rapportService = rapportService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Rapport> getAllRapports() {
        return rapportService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Rapport createRapport(@Valid @RequestBody Rapport rapport) {
        return rapportService.createRapport(rapport);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRapport(@PathVariable long id) {
        rapportService.deleteRapport(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Rapport updateRapport(@Valid @RequestBody Rapport rapport) {
        return rapportService.updateRapport(rapport);
    }
    
}
