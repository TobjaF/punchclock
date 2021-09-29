package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.Rapport;
import ch.zli.m223.punchclock.domain.Rapport;
import ch.zli.m223.punchclock.service.RapportService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
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
    public List<Rapport> getAllRapports(Rapport rapport, HttpSession session) {
        session.getAttribute("FIRST_SESSION_TEST");
        return rapportService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Rapport createRapport(@Valid @RequestBody Rapport rapport, HttpServletRequest request) {
        request.getSession().getAttribute("FIRST_SESSION_TEST");
        request.getSession().setAttribute("FIRST_SESSION_TEST", rapport);
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
